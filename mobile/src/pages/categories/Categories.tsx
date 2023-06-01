import { VStack, Text, HStack, Center, Box, ScrollView, Modal, FormControl, Input, Button } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigatorParams } from "../../routes";

import { Category } from "../../components/Category";
import { TransactionContext } from "../../contexts/transactionsContext";
import { TouchableOpacity } from "react-native";

export function Categories() {
  const [name, setName] = useState("");

  const { goBack } = useNavigation();
  const [showModal, setShowModal] = useState(false);



  const {
    categories,
    getCategories,
    createCategory

  } = useContext(TransactionContext);



  useEffect(() => {
    getCategories();
  }, []);

  const { params } = useRoute<RouteProp<StackNavigatorParams>>();
  return (
    <SafeAreaView style={{ flex: 1 }}>


      <VStack alignItems={"flex-start"} marginBottom={"19"} width={"96%"} backgroundColor="#fafafa" >
        <HStack paddingX={1} alignItems={"center"} marginTop={"2"}>
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
          <HStack marginLeft={"75"}>
            <Text fontSize={"18px"} bold color={"#000"}>
              Lista De Categorias
            </Text>


          </HStack>


          <HStack
            marginLeft={"20"}
          >
            <Feather
              BsThreeDotsVertical
              name="more-vertical"
              size={22}
              color="#000"
              onPress={() => setShowModal(true)}
            />
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Nova Categoria</Modal.Header>
                <Modal.Body>
                  <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input onChangeText={setName}
                      value={name}
                      type="text" />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button colorScheme={"green"} width={290} onPress={() => {
                      createCategory({ name })
                      setShowModal(false);
                    }}>
                      Save
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </HStack>
        </HStack>

        <VStack width={"96%"}>
          <HStack justifyContent={"space-between"} marginLeft={6} marginTop={4}>
            <Text fontSize={"18px"} color={"#000"}>
              Lista
            </Text>
          </HStack>


        </VStack>

        <VStack marginLeft={4} marginTop={4} >

          <ScrollView
            showsHorizontalScrollIndicator={false}
            marginTop={4}

          >
            {categories.map((e) => (
              <TouchableOpacity
                activeOpacity={0.7}
              >
                <HStack style={{ width: "100%" }} marginBottom={4} >

                  <HStack
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: "#DCE5E1",
                    }}
                  ></HStack>

                  <HStack marginLeft={4}
                    marginTop={2.5}>
                    <VStack width={220}>
                      <Text fontSize={"18px"} bold color={"#000000"} >
                        {e.name}
                      </Text>
                    </VStack>
                  </HStack>
                </HStack>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </VStack>


      </VStack>
    </SafeAreaView>
  );
}
