import { HStack, Text, VStack } from "native-base";
import { ImageBackground, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigatorParams } from "../../routes";
import { TypeTransaction } from "../../contexts/transactionsContext";

export type FoodProps = {
  type: TypeTransaction;
  value: number;
  description: string;
  date: string;
  category_id: string
};


export function Transaction({
  date,
  description,
  value,
  category_id,
  type,
}: FoodProps) {
  const { navigate } = useNavigation<NavigationProp<StackNavigatorParams>>();
  return (
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

        <HStack marginLeft={4}>
          <VStack width={220}>
            <Text fontSize={"18px"} bold color={"#000000"} >
              {description}
            </Text>
            <Text fontSize={"18px"} color={"#000000"}>
              {new Date(date).toDateString()}
            </Text>
          </VStack>

          <Text fontSize={"18px"} bold color={type === "INCOME" ? "#5ADCA2" : "#DD1E1E"} marginLeft={4} marginTop={4}>
            {type === "INCOME" ? "+" : "-"} {value} KZ
          </Text>
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}
