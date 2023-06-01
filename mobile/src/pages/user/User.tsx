import React, { useEffect, useState } from "react";
import { VStack, Text, HStack, Center } from "native-base";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigatorParams } from "../../routes";

export function User() {
  const [name, setName] = useState(1);
  const [email, setEmail] = useState(1);
  const [id, setId] = useState(1);


  const { navigate } = useNavigation<NavigationProp<StackNavigatorParams>>();

  function logout() {
    AsyncStorage.removeItem("user");
    navigate("signIn");
  }

  const getData = async () => {
    try {
      const value = (await AsyncStorage.getItem("user")) as string;
      const data = JSON.parse(value);
      if (value !== null) {
        setName(data.name);
        setEmail(data.email);
        setId(data.id);

      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack
        flex={1}
        alignItems="center"
        marginTop={14}
        backgroundColor="#fafafa"
      >
        <VStack width={"94%"} >
          <HStack alignItems={"center"} marginTop={10}>
            <Text fontSize={"4xl"} bold lineHeight={40} marginBottom="4">
              Meu Perfil
            </Text>
          </HStack>
          <VStack marginTop={180}>
            <Center>
              <VStack
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: "#C4C4C4",
                }}
              ></VStack>
              <VStack marginLeft={4}>
                <Text fontSize={16} bold>
                  {name}
                </Text>
              </VStack>
              <Text>{email}</Text>
            </Center>
          </VStack>
        </VStack>

        <Center
          width={"96%"}
          height={12}
          bg="#2D4A22"
          borderRadius={5}
          marginTop={20}
        >
          <TouchableOpacity onPress={() => logout()}>
            <Text fontSize={"18px"} color={"white"}>
              Logout
            </Text>
          </TouchableOpacity>
        </Center>
      </VStack>
    </SafeAreaView>
  );
}
