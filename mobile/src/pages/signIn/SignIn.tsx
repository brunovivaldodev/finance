import {
  VStack,
  Text,
  HStack,
  Center,
  FormControl,
  Stack,
  Input,
} from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import { StackNavigatorParams } from "../../routes";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../config/api";

interface signInFormInput {
  email: string;
  password: string;
}

import AsyncStorage from "@react-native-async-storage/async-storage";

export function SingIn() {
  const [loginError, setLoginError] = useState(false);

  const { navigate } = useNavigation<NavigationProp<StackNavigatorParams>>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmitLogin(data: signInFormInput) {
    const { email, password } = data;
    setLoginError(false);
    const response = await api.post("users/authenticate", {
      email,
      password,
    });


    if (response.data.message === "Email ou Password Inválido") {
      setLoginError(true);
      return;
    }

    AsyncStorage.setItem("user", JSON.stringify(response.data));

    reset();

    navigate("tabNavigator");
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack alignItems={"flex-start"} width={"96%"} backgroundColor="#fafafa">

        <VStack
          borderStyle={"solid"}
          width={"96%"}
          marginLeft="4"
          marginTop={8}
          borderRadius="30"
          marginBottom={70}
          height={250}
        >
          <VStack width={"96%"} height={200} marginTop="5">
            <Center style={{ height: "40%" }} marginBottom="1">
              <Image
                source={require("../../../assets/cashbox.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              ></Image>

              <Text fontSize={"18px"} bold color={"#5ADCA2"} marginTop="5" marginBottom={2} >
                Login
              </Text>
              <VStack
                borderStyle={"solid"}
                borderWidth="1"
                borderColor={"#5ADCA2"}
                width={"60%"}
              ></VStack>
            </Center>
          </VStack>

          <VStack width={"96%"} height={200} marginTop="-15" marginBottom={20}>
            <Center marginBottom="10">
              <FormControl>
                <Stack space={5}>
                  <Stack>
                    <FormControl.Label>EMAIL</FormControl.Label>
                    <Controller
                      control={control}
                      name="email"
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          variant="underlined"
                          onChangeText={onChange}
                          value={value}
                          autoCapitalize="none"
                          autoComplete="email"
                        ></Input>
                      )}
                    />
                  </Stack>
                  <Stack>
                    <FormControl.Label>PASSWORD</FormControl.Label>
                    <Controller
                      control={control}
                      name="password"
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          variant="underlined"
                          onChangeText={onChange}
                          value={value}
                          type="password"
                        />
                      )}
                    />
                  </Stack>
                  {loginError && (
                    <Text color={"#CE1313"}>Email ou Password Inválido</Text>
                  )}
                </Stack>
              </FormControl>
            </Center>
          </VStack>


        </VStack>

        <VStack width={"100%"} marginLeft="4" marginTop={60}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSubmit(handleSubmitLogin)}
          >
            <Center width={"96%"} height={12} bg="#2D4A22" borderRadius={5}>
              <Text fontSize={"18px"} color={"white"}>
                Entrar
              </Text>
            </Center>
          </TouchableOpacity>
        </VStack>

        <VStack marginTop={38} width={"100%"} marginLeft="4">
          <Center width={"96%"}>
            <TouchableOpacity
              onPress={() => {
                navigate("signUp");
              }}
            >
              <Text color={"#5ADCA2"}>criar nova conta</Text>
            </TouchableOpacity>
          </Center>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
