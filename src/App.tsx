import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as fs from "fs";
import { RecoilRoot } from "recoil";
import { ipcRenderer } from "electron";
import { checkWgIsInstalled } from "wireguard-tools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppProvider from "./context";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react";
import Routes from "./routes/index";
import store, { AppDispatch } from "./store";

import * as WireGuard from "./utils/wg";
import {
  addFile,
  fetchFiles,
  updateStatus,
} from "./store/modules/wgConfig/action";
import { AppState, StoreState, WgConfigState } from "./types/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { files } = useSelector<StoreState, WgConfigState>(
    (state) => state.wgConfig
  );
  const { userDataPath } = useSelector<StoreState, AppState>(
    (state) => state.app
  );

  const [setupRequired, setSetupRequired] = React.useState(false);

  useEffect(() => {
    if (process.platform === "darwin") {
      ipcRenderer.on("setup-required", () => setSetupRequired(true));
    }
    return () => { ipcRenderer.removeAllListeners("setup-required"); };
  }, []);

  async function handleInstallSudoers() {
    const result = await ipcRenderer.invoke("install-sudoers-macos") as { success: boolean; error?: string };
    if (result.success) {
      setSetupRequired(false);
      toast("Configuration installed successfully", { type: "success" });
    } else {
      toast("Failed to install configuration: " + result.error, { type: "error" });
    }
  }

  useEffect(() => {
    ipcRenderer.removeAllListeners("importFiles");
    ipcRenderer.on("importFiles", (event, filepaths: string[]) => {
      filepaths.forEach((filepath) => {
        const filename = filepath.replace(/^.*[\\/]/, "").split(".conf")[0];

        if (!filename) {
          toast("Name cannot be empty", { type: "error" });
          return;
        }

        if (filename.length > 15) {
          toast("Filename is too long, maximum 15 characters", {
            type: "error",
          });
          return;
        }

        fs.readFile(filepath, "utf8", (err, data) => {
          if (err) {
            toast(err.message, { type: "error" });
            return;
          }

          if (!data) {
            toast("Interface cannot be empty", { type: "error" });
            return;
          }

          if (files.some((f) => f.name === filename)) {
            toast(`A tunnel named ${filename} already exists`, {
              type: "error",
            });
            return;
          }

          try {
            dispatch(addFile(`${filename}.conf`, data, userDataPath));
            toast(`${filename} has been added`, { type: "success" });
          } catch (e) {
            toast(e.message, { type: "error" });
          }
        });
      });
    });
  }, [files]);

  useEffect(() => {
    async function check() {
      try {
        await checkWgIsInstalled();
      } catch (err) {
        toast("Wireguard is not installed on the system.", { type: "error" });
      }
    }

    ipcRenderer.on("toggleTunnel", async (event, args) => {
      try {
        const started = await WireGuard.toggle(args.path);
        const action = started ? "Activated" : "Deactivated";
        const message = `${action} ${args.name}`;

        toast(message, { type: "success" });
        new Notification("Wire GUI", { body: message });

        dispatch(updateStatus(started ? args.name : ""));
      } catch (e) {
        toast(e.message, { type: "error" });
        new Notification("Wire GUI", { body: e.message });
      }
    });

    ipcRenderer.send("check-for-updates");
    ipcRenderer.on("update-available", () => {
      toast("There's a new update available, check our github releases page.", {
        type: "warning",
      });
    });

    check();
    dispatch(fetchFiles(userDataPath));
  }, []);

  return (
    <AppProvider>
      <Routes />
      <Modal isOpen={setupRequired} onClose={() => {}} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent bg="gray.200" color="whiteAlpha.800">
          <ModalHeader>Configuration requise</ModalHeader>
          <ModalBody>
            <Text>WireGUI a besoin d'installer une règle de permissions pour afficher les stats du tunnel.</Text>
            <Text mt={2} fontSize="sm" color="whiteAlpha.600">Votre mot de passe administrateur sera demandé.</Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="ghost" onClick={() => setSetupRequired(false)}>Plus tard</Button>
            <Button colorScheme="orange" onClick={handleInstallSudoers}>Installer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer pauseOnFocusLoss={false} theme="dark" toastStyle={{ backgroundColor: "#2A2A2A", color: "#FF6C0E" }} />
    </AppProvider>
  );
}

export default function () {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </RecoilRoot>
  );
}
