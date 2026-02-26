import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export const MotionBox = motion(chakra.div);
export type MotionBoxProps = React.ComponentProps<typeof MotionBox>;
