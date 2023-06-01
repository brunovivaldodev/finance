import React, { useContext, useEffect, useState } from "react";
import { VStack, Text, HStack, ScrollView, Center, Box } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { foods } from "../../data";
import { Transaction } from "../../components/Transaction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TransactionContext, TypeTransaction } from "../../contexts/transactionsContext";
import { useSummary } from "../../hooks/useSummary";

export function Home() {

  const [name, setName] = useState("");
  const {
    transactions,
    getTransactionsHandler,

  } = useContext(TransactionContext);


  const sumary = useSummary()

  const getUserDatas = async () => {
    try {
      const value = (await AsyncStorage.getItem("user")) as string;
      const data = JSON.parse(value);
      if (value !== null) {
        setName(data.name);
      }
    } catch (e) {
      // error reading value
    }
  };


  useEffect(() => {
    getUserDatas();
    getTransactionsHandler()
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack
        flex={1}
        alignItems="center"
        marginTop={14}
        backgroundColor="#fafafa"
      >
        <VStack width={"94%"}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HStack
              alignItems={"center"}
              justifyContent="space-between"
              marginTop={5} width={"100%"}
            >
              <Center width={"50%"} alignItems={"center"} justifyContent="center" marginLeft={90} >
                <Text fontSize={"2xl"} lineHeight={40}>
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
                  Olá, {name}
                </Text>
              </Text>
            </HStack>


            <VStack marginTop={25} width="94%" marginLeft={1.5}>
              <HStack >
                <HStack marginRight={14} style={{
                  width: 120,
                  height: 60,
                  backgroundColor: "#EAEBEC",
                  borderRadius: 12
                }}>
                  <Text marginLeft={4} marginTop={2}>Entradas{"\n"}<Text>{sumary.income} kz</Text>
                  </Text>

                </HStack>
                <HStack marginRight={14} style={{
                  width: 120,
                  height: 60,
                  backgroundColor: "#EAEBEC",
                  borderRadius: 12
                }}>
                  <Text marginLeft={4} marginTop={2}>Saídas{"\n"}<Text>{sumary.outcome} kz</Text>
                  </Text>

                </HStack>
                <HStack style={{
                  width: 120,
                  height: 60,
                  backgroundColor: "#EAEBEC",
                  borderRadius: 12
                }}>
                  <Text marginLeft={4} marginTop={2}>Total{"\n"}<Text>{sumary.total} kz</Text>
                  </Text>

                </HStack>
              </HStack>
            </VStack>

            <VStack marginTop={4}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                marginTop={4}
              >
                {transactions.map((e) => (
                  <Box marginRight={4}>
                    <Transaction
                      category_id={e.category_id}
                      date={e.date}
                      value={e.value}
                      description={e.description}
                      type={e.type as TypeTransaction}
                      key={e.id}
                    />
                  </Box>
                ))}
              </ScrollView>
            </VStack>

          </ScrollView>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
