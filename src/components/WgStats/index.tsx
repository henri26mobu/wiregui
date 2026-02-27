import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Divider } from "@chakra-ui/react";
import { getWgStats } from "../../ipc/renderer/ipcStats";

interface ParsedStats {
  interface?: string;
  listenPort?: string;
  peers: {
    publicKey: string;
    endpoint?: string;
    allowedIps?: string;
    latestHandshake?: string;
    transfer?: string;
  }[];
}

function parseWgShow(raw: string): ParsedStats {
  const lines = raw.split("\n");
  const result: ParsedStats = { peers: [] };
  let currentPeer: ParsedStats["peers"][0] | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("interface:")) {
      result.interface = trimmed.split(":")[1].trim();
    } else if (trimmed.startsWith("listening port:")) {
      result.listenPort = trimmed.split(":")[1].trim();
    } else if (trimmed.startsWith("peer:")) {
      if (currentPeer) result.peers.push(currentPeer);
      currentPeer = { publicKey: trimmed.split(":")[1].trim() };
    } else if (currentPeer) {
      if (trimmed.startsWith("endpoint:")) {
        currentPeer.endpoint = trimmed.split(/:(.+)/)[1].trim();
      } else if (trimmed.startsWith("allowed ips:")) {
        currentPeer.allowedIps = trimmed.split(/:(.+)/)[1].trim();
      } else if (trimmed.startsWith("latest handshake:")) {
        currentPeer.latestHandshake = trimmed.split(/:(.+)/)[1].trim();
      } else if (trimmed.startsWith("transfer:")) {
        currentPeer.transfer = trimmed.split(/:(.+)/)[1].trim();
      }
    }
  }
  if (currentPeer) result.peers.push(currentPeer);
  return result;
}

export default function WgStats({ tunnelName }: { tunnelName: string }) {
  const [stats, setStats] = useState<ParsedStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const result = await getWgStats();
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setStats(parseWgShow(result.data));
        setError(null);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, [tunnelName]);

  if (error) return (
    <Box mt="4" p="3" bg="gray.300" borderRadius="4">
      <Text fontSize="xs" color="red.300">Stats unavailable: {error}</Text>
    </Box>
  );

  if (!stats) return null;

  return (
    <Box mt="4" p="3" bg="gray.300" borderRadius="4">
      <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700" mb="2">
        LIVE STATS
      </Text>
      <Divider mb="2" borderColor="whiteAlpha.200" />
      {stats.peers.map((peer, i) => (
        <Flex key={i} direction="column" gap="1">
          {peer.endpoint && (
            <Flex justify="space-between">
              <Text fontSize="xs" color="whiteAlpha.500">Endpoint</Text>
              <Text fontSize="xs" color="whiteAlpha.800" fontFamily="mono">{peer.endpoint}</Text>
            </Flex>
          )}
          {peer.latestHandshake && (
            <Flex justify="space-between">
              <Text fontSize="xs" color="whiteAlpha.500">Handshake</Text>
              <Text fontSize="xs" color="whiteAlpha.800">{peer.latestHandshake}</Text>
            </Flex>
          )}
          {peer.transfer && (
            <Flex justify="space-between">
              <Text fontSize="xs" color="whiteAlpha.500">Transfer</Text>
              <Text fontSize="xs" color="orange.300" fontWeight="bold">{peer.transfer}</Text>
            </Flex>
          )}
          {peer.allowedIps && (
            <Flex justify="space-between">
              <Text fontSize="xs" color="whiteAlpha.500">Allowed IPs</Text>
              <Text fontSize="xs" color="whiteAlpha.800" fontFamily="mono">{peer.allowedIps}</Text>
            </Flex>
          )}
        </Flex>
      ))}
    </Box>
  );
}
