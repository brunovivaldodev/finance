import { VStack, Text, HStack, Center, Box, ScrollView } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigatorParams } from "../../routes";
import { Chart } from "../../components/chart";
import { TransactionContext } from "../../contexts/transactionsContext";
import { Category } from "../../components/Category";

export function Report() {
  const { navigate } = useNavigation<NavigationProp<StackNavigatorParams>>();

  const { goBack } = useNavigation();

  const {
    categories,
    getCategories,
    transactions

  } = useContext(TransactionContext);


  useEffect(() => {
    getCategories()
  }, []);


  const { params } = useRoute<RouteProp<StackNavigatorParams>>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack alignItems={"flex-start"} marginBottom={"19"} width={"96%"} backgroundColor="#fafafa">
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
          <HStack marginLeft={"110"}>
            <Text fontSize={"18px"} bold color={"#000"}>
              Report
            </Text>
          </HStack>

        </HStack>

        <VStack width={"96%"}>
          <HStack justifyContent={"space-between"} marginLeft={6} marginTop={4}>
            <Text fontSize={"18px"} color={"#000"}>
              Gráfico De Gastos
            </Text>
            <Text fontSize={"18px"} color={"#000"}>
              Este Mês
            </Text>

          </HStack>


        </VStack>

        <VStack
          borderStyle={"solid"}
          borderWidth="1"
          width={"96%"}
          marginLeft="4"
          marginTop={8}
          borderRadius="12"
          height={280}
        >
          <Center marginTop={4}>
            <Chart></Chart>
          </Center>
        </VStack>

        <VStack marginLeft={4} marginTop={4} height={400}>
          <Text fontSize={"18px"} color={"#000"} >
            Detalhes
          </Text>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            marginTop={4}

          >
            {categories.map((e) => (
              <Box marginRight={4}>
                <Category
                  name={e.name}
                  id={e.user_id}
                />
              </Box>
            ))}
          </ScrollView>
        </VStack>


      </VStack>
    </SafeAreaView>
  );
}
