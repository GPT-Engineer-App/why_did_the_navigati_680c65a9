import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

const ColorPicker = ({ setColor }) => {
  const colors = ["lightgreen", "lightblue", "lightpink", "lightgray", "white", "black", "salmon", "gold", "orchid", "coral", "aqua", "lime"];

  return (
    <SimpleGrid columns={6} spacing={2}>
      {colors.map((color) => (
        <Box key={color} h="24px" w="24px" bg={color} cursor="pointer" _hover={{ opacity: 0.8 }} onClick={() => setColor(color)} />
      ))}
    </SimpleGrid>
  );
};

export default ColorPicker;
