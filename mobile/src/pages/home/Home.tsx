import React from "react";
import { VStack, Text, HStack, ScrollView, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack
        flex={1}
        alignItems="center"
        marginTop={14}
        backgroundColor="#fff"
      >
        <VStack width={"94%"}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HStack
              alignItems={"center"}
              justifyContent="space-between"
              marginTop={5} width={"100%" }
            >
              <Center width={"50%"} alignItems={"center"} justifyContent="center" marginLeft={90} >
              <Text fontSize={"2xl"}  lineHeight={40}>
                Home 
              </Text>
              </Center>

              <VStack
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: "#C4C4C4",
                }}
              ></VStack>
            </HStack>

            <HStack alignItems={"center"} space="1">
              <Text fontSize={"2xl"} lineHeight={40}>
                Vamos poupar seu dinheiro{"\n"}<Text fontSize={18} lineHeight={40}>
              Olá, Bruno
              </Text>
              </Text>
            </HStack>


            <VStack marginTop={42} width="94%" marginLeft={1.5}>
              <HStack >
                <HStack marginRight={14} style={{
                  width: 120,
                  height: 60,
                  backgroundColor: "#C4C4C4",
                }}>
                  <Text marginLeft={4} marginTop={2}>Entradas{"\n"}<Text>10.000kz</Text>
                  </Text>
                 
                </HStack>
                <HStack marginRight={14} style={{
                  width: 120,
                  height: 60,
                  backgroundColor: "#C4C4C4",
                }}>
                  <Text marginLeft={4} marginTop={2}>Saídas{"\n"}<Text>10.000kz</Text>
                  </Text>
                 
                </HStack>
                <HStack style={{
                  width: 120,
                  height: 60,
                  backgroundColor: "#C4C4C4",
                }}>
                  <Text marginLeft={4} marginTop={2}>Total{"\n"}<Text>10.000kz</Text>
                  </Text>
                 
                </HStack>
              </HStack>
            </VStack>

            <VStack marginTop={2}>
            <HStack >
              <Text fontSize={"2xl"} lineHeight={40}>
                Activiades Recentes
              </Text>
            </HStack>
            <HStack marginTop={2}>
                <HStack marginRight={14} style={{
                  width: 120,
                  height: 60,
                  borderRadius :12,
                  backgroundColor: "#C4C4C4",
                }}>
                  <Text marginLeft={4} marginTop={2}>Hoje
                  </Text>
                 
                </HStack>
                <HStack marginRight={14} style={{
                  width: 120,
                  height: 60,
                  borderRadius :12,
                  backgroundColor: "#C4C4C4",
                }}>
                  <Text marginLeft={4} marginTop={2}>Esta Semana
                  </Text> 
                </HStack>
                <HStack style={{
                  width: 120,
                  height: 60,
                  borderRadius :12,
                  backgroundColor: "#C4C4C4",
                }}>
                  <Text marginLeft={4} marginTop={2}>Este Mês
                  </Text>
                 
                </HStack>
              </HStack>
            </VStack>

       

        
          </ScrollView>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
