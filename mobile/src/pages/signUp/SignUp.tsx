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
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, TextInput, TouchableOpacity } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { api } from "../../config/api";
import { StackNavigatorParams } from "../../routes";

interface signUpFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SingUp() {
  const [passwordError, setPasswordError] = useState(false);
  const [userExistsError, setUserExists] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmitSignUp(data: signUpFormInput) {
    const { email, name, password, confirmPassword } = data;

    setPasswordError(false);
    setUserExists(false);

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    const response = await api.post("users", {
      name,
      email,
      password,
    });

    if (response.data.message === "Users already Existis") {
      setUserExists(true);
    }

    reset();
  }

  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack alignItems={"flex-start"} marginBottom={"19"} width={"96%"}>
          <HStack
            alignItems="center"
            space={2}
            marginLeft={"2"}
            marginRight={"8"}
          >
            <AntDesign
              name="arrowleft"
              size={22}
              color="#000"
              onPress={() => {
                goBack();
              }}
            />
          </HStack>

        <VStack
          borderStyle={"solid"}
          width={"96%"}
          marginLeft="4"
          marginTop={8}
          borderRadius="30"
          height={250}
        >
        <VStack width={"96%"} height={200} marginTop="5">
          <Center style={{height:"40%"}} >
          <Image
              source={require("../../../assets/cashbox.png")}
              style={{ width: "100%", height: "100%"}}
              resizeMode="contain"      
          ></Image>

            <Text fontSize={"18px"} bold color={"#5ADCA2"} marginTop="5" marginBottom={2} >
              Criar Conta
            </Text>
            <VStack
              borderStyle={"solid"}
              borderWidth="1"
              borderColor={"#5ADCA2"}
              width={"60%"}
            ></VStack>
          </Center>
           </VStack>
          <Center marginTop={-10}>
            <FormControl>
              <Stack space={5}>
                <Stack>
                  <FormControl.Label>NAME</FormControl.Label>
                  <Controller
                    control={control}
                    name="name"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        variant="underlined"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </Stack>
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
                      />
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
                <Stack>
                  <FormControl.Label>CONFIRMATION PASSWORD</FormControl.Label>
                  <Controller
                    control={control}
                    name="confirmPassword"
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

                {passwordError && (
                  <Text color={"#CE1313"}>
                    Por favor, confirma correctamente a sua password
                  </Text>
                )}

                {userExistsError && (
                  <Text color={"#CE1313"}>Usuário Já Existe</Text>
                )}
              </Stack>
            </FormControl>
          </Center>
        </VStack>

        <VStack width={"100%"} marginLeft="4" marginTop={260}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSubmit(handleSubmitSignUp)}
          >
            <Center width={"96%"} height={12} bg="#2D4A22" borderRadius={5}>
              <TouchableOpacity>
                <Text fontSize={"18px"} color={"white"}>
                  Criar conta
                </Text>
              </TouchableOpacity>
            </Center>
          </TouchableOpacity>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
