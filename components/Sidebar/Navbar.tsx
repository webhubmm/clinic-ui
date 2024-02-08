"use client";
import {
  Box,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { CiMenuFries } from "react-icons/ci";
import CustomModal from "../Custom/CustomModal";
import { useRouter } from "next/navigation";
import { getToken, removeAuth } from "@/lib/auth";
import { UserLogout } from "@/lib/logout";

interface Props {
  onShowSidebar: VoidFunction;
  showSidebarButton?: boolean;
}

const Navbar = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accessToken = getToken();
  const logOutFun = () => {
    if (accessToken) UserLogout(accessToken);
    removeAuth();
    router.push("/login");
  };

  return (
    <Flex
      bg="brands.logInTextColor"
      p={4}
      color="brands.logInTextColor"
      alignItems="center"
      justifyContent="center"
      shadow="lg"
    >
      <Box flex="1">
        {showSidebarButton && (
          <CiMenuFries
            style={{ fontSize: "25px", color: "#000" }}
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Box flex="end">
        <Menu id="menu-button-R5aqiucqH1">
          <MenuButton>
            <Avatar
              size="sm"
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
          </MenuButton>
          <MenuList color="#000">
            <Button width={"100%"} onClick={() => onOpen()}>
              Log Out
            </Button>
          </MenuList>
        </Menu>
      </Box>

      <CustomModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        modalTitle={"Log Out"}
        modalText={"Are you sure to logout??"}
        actionFun={logOutFun}
        actionText={"Log Out"}
      />
    </Flex>
  );
};

export default Navbar;
