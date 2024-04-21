import React, { useState } from "react";
import { ChakraProvider, Box, Flex, Text, Button, IconButton, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, useDisclosure, VStack, FormControl, Heading, theme, FormLabel } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker.jsx";
import { FaBars, FaUserCircle } from "react-icons/fa";

const Index = () => {
  const [canvasText, setCanvasText] = useState("Your text here...");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("lightgreen");
  const [fontSize, setFontSize] = useState("20");
  const [activeStep, setActiveStep] = useState(1);
  const [topCanvasText, setTopCanvasText] = useState("");
  const [bottomCanvasText, setBottomCanvasText] = useState("");
  const [canvasSize, setCanvasSize] = useState({ width: "100%", height: "500px" });
  const maxSteps = 4;

  const nextStep = () => setActiveStep((prev) => (prev < maxSteps ? prev + 1 : prev));
  const prevStep = () => setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  const { isOpen: isLeftOpen, onOpen: onLeftOpen, onClose: onLeftClose } = useDisclosure();
  const { isOpen: isRightOpen, onOpen: onRightOpen, onClose: onRightClose } = useDisclosure();

  const handleTextChange = (e) => setCanvasText(e.target.value);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);

  const validateLogin = () => {
    let isValid = true;
    setUsernameError("");
    setPasswordError("");

    // Check if username is empty
    if (!document.getElementById("username").value) {
      setUsernameError("Username is required");
      isValid = false;
    }

    // Check if password is empty
    if (!document.getElementById("password").value) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateLogin()) {
      // Proceed with the login process
    }
  };

  const handleDownload = () => {
    // Placeholder function for downloading the canvas as an image
    // The actual implementation will depend on the project requirements and libraries
  };

  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" minH="100vh">
        {/* Navbar */}
        <Flex as="nav" justifyContent="space-between" alignItems="center" p={4} borderBottomWidth="1px">
          <IconButton variant="ghost" aria-label="Open menu drawer" icon={<FaBars />} onClick={onLeftOpen} />
          <Text fontSize="xl" fontWeight="bold">
            Graphics Generator
          </Text>
          <IconButton variant="ghost" aria-label="Open login drawer" icon={<FaUserCircle />} onClick={onRightOpen} />
        </Flex>

        {/* Main content */}
        <Flex overflow="hidden" direction={{ base: "column", md: "row" }}>
          {/* Canvas area */}
          <Box flex="2" p={4}>
            <Box style={{ width: "100%", height: "500px", overflow: "hidden", borderRadius: "16px", boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)" }}>
              <Box style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundColor: backgroundColor, width: canvasSize.width, height: canvasSize.height, margin: "0 auto", borderRadius: "inherit", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)" }}>
                <VStack spacing={8} align="center" justify="space-between" h="full">
                  <Text fontSize={`${fontSize}px`}>{topCanvasText}</Text>
                  <Text fontSize={`${fontSize}px`}>{canvasText}</Text>
                  <Text fontSize={`${fontSize}px`}>{bottomCanvasText}</Text>
                </VStack>
              </Box>
            </Box>
          </Box>

          {/* Sidebar */}
          <Box flex="1" bg="gray.100" p={4}>
            <Box flex="1" bg="gray.100" p={4}>
              <VStack spacing={4} h="80%">
                {activeStep === 1 && (
                  <VStack spacing={4}>
                    <Heading as="h3" size="lg">
                      Step 1: Customize Text
                    </Heading>
                    <Text as="p">Set your desired text and font size for the canvas.</Text>
                    <Flex alignItems="center" justifyContent="space-between">
                      <FormLabel htmlFor="fontSize" mb="0" w="50%">
                        Font Size:
                      </FormLabel>
                      <Input id="fontSize" type="number" value={fontSize} onChange={handleFontSizeChange} w="50%" />
                    </Flex>

                    <FormControl>
                      <Input id="topCanvasText" placeholder="Enter top text" value={topCanvasText} onChange={(e) => setTopCanvasText(e.target.value)} textAlign="center" />
                    </FormControl>
                    <FormControl>
                      <Input id="canvasText" placeholder="Enter middle text" value={canvasText} onChange={handleTextChange} textAlign="center" />
                    </FormControl>
                    <FormControl>
                      <Input id="bottomCanvasText" placeholder="Enter bottom text" value={bottomCanvasText} onChange={(e) => setBottomCanvasText(e.target.value)} textAlign="center" />
                    </FormControl>

                    <Button colorScheme="blackAlpha" onClick={() => {}} mt={4}>
                      Apply Changes
                    </Button>
                  </VStack>
                )}
                {activeStep === 2 && (
                  <VStack spacing={4}>
                    <Heading as="h3" size="lg">
                      Step 2: Background
                    </Heading>
                    <Text as="p">Choose a background image or color for your canvas.</Text>
                    <FormControl>
                      <Input id="backgroundImage" placeholder="Enter image URL" value={backgroundImage} onChange={(e) => setBackgroundImage(e.target.value)} />
                    </FormControl>
                    <Button colorScheme="blackAlpha" onClick={() => {}} mt={4}>
                      Apply Background
                    </Button>
                    <Heading as="h3" size="lg" mb={4}>
                      Background Color:
                    </Heading>
                    <ColorPicker setColor={setBackgroundColor} />
                  </VStack>
                )}
                {activeStep === 3 && (
                  <VStack spacing={4}>
                    <Heading as="h3" size="lg">
                      Step 3: Canvas Size
                    </Heading>
                    <Text as="p">Select a pre-defined canvas size that fits your needs.</Text>
                    <Button onClick={() => setCanvasSize({ width: "4in", height: "6in" })}>4x6</Button>
                    <Button onClick={() => setCanvasSize({ width: "5in", height: "7in" })}>5x7</Button>
                    <Button onClick={() => setCanvasSize({ width: "8in", height: "10in" })}>8x10</Button>
                    <Button onClick={() => setCanvasSize({ width: "8.3in", height: "11.7in" })}>A4</Button>
                  </VStack>
                )}
                {activeStep === 4 && (
                  <VStack spacing={4}>
                    <Heading as="h3" size="lg">
                      Step 4: Review
                    </Heading>
                    <Text as="p">Review your changes and make any final adjustments before saving.</Text>
                  </VStack>
                )}
              </VStack>
              <Flex h="20%" alignItems="center" justifyContent="space-between" p={4} borderTopWidth="1px">
                <Button onClick={prevStep}>Previous</Button>
                {activeStep < maxSteps && <Button onClick={nextStep}>Next</Button>}
                {activeStep === maxSteps && (
                  <Button colorScheme="blue" onClick={handleDownload}>
                    Download
                  </Button>
                )}
              </Flex>
            </Box>
          </Box>
        </Flex>

        {/* Left Drawer Menu */}
        <Drawer placement="left" onClose={onLeftClose} isOpen={isLeftOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>{/* Menu content goes here */}</DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Right Drawer Login */}
        <Drawer placement="right" onClose={onRightClose} isOpen={isRightOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4}>
                <Heading as="h2" size="md">
                  Welcome Back!
                </Heading>
                <Text>Enter your details below to continue.</Text>
                <FormControl>
                  <Input id="username" placeholder="Enter your username" isInvalid={usernameError} />
                  {!usernameError ? null : <Text color="red.500">{usernameError}</Text>}
                </FormControl>
                <FormControl mt={4}>
                  <Input id="password" placeholder="Enter your password" type="password" isInvalid={passwordError} />
                  {!passwordError ? null : <Text color="red.500">{passwordError}</Text>}
                </FormControl>
                <Button variant="link" mt={2}>
                  Forgot password?
                </Button>
                <Text mt={4}>
                  Don’t have an account?{" "}
                  <Button variant="link" as="a">
                    Sign Up
                  </Button>
                </Text>
              </VStack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onRightClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleLogin}>
                Login
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
