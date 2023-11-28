import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  useColorModeValue,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import { FaTooth } from "react-icons/fa";
import { FiClipboard, FiSettings, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import Link from "next/link";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  route: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Agenda", icon: FaTooth, route: "/dashboard" },
  { name: "Serviços", icon: FiClipboard, route: "/services" },
  { name: "Minha conta", icon: FiSettings, route: "/profile" },
];

const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link href={route} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color={"#fff"}
        _hover={{ bg: "clinic.900" }}
        {...rest}
      >
        {icon && <Icon mr={4} fontSize="16" as={icon} color={"#fff"} />}
        {children}
      </Flex>
    </Link>
  );
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg="clinic.400"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.700", "gray.900")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" mx="8">
        <Link href="/dashboard">
          <Flex cursor="pointer" userSelect="none" flexDirection="row">
            <Text
              fontSize="2xl"
              fontFamily="monospace"
              fontWeight="bold"
              color="#fff"
            >
              SmileGestor
            </Text>
            <Text
              fontSize="2xl"
              fontFamily="monospace"
              fontWeight="bold"
              color="button.cta"
            >
              PRO
            </Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem icon={link.icon} route={link.route} key={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("clinic.400", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.700", "gray.900")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu color="#fff" />}
        _hover={{ bg: "#2d375f" }}
      />

      <Flex flexDirection="row">
        <Text
          ml={8}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="#fff"
        >
          SmileGestor
        </Text>
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="button.cta"
        >
          PRO
        </Text>
      </Flex>
    </Flex>
  );
};

export function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="clinic.900">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
        onClose={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={() => onClose()} color="#fff" />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  );
}
