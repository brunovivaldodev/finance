import { HStack, Text, VStack } from "native-base";
import { ImageBackground, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigatorParams } from "../../routes";

export type FoodProps = {
  imageUri: string;
  price: number;
  seller: string;
  food: string;
  description: string;
};
export function ReserveFood({
  imageUri,
  price,
  seller,
  food,
  description,
}: FoodProps) {
  const { navigate } = useNavigation<NavigationProp<StackNavigatorParams>>();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigate("detail", { imageUri, price, seller, food, description })
      }
      style={{ marginLeft: 10 }}
    >
      <VStack style={{ width: 180 }}>
        <ImageBackground
          source={{ uri: imageUri }}
          imageStyle={{ borderRadius: 15 }}
          style={{ width: "100%", height: 167, justifyContent: "flex-end" }}
        >
          <HStack
            paddingX={1}
            alignItems={"center"}
            marginBottom={5}
            justifyContent="space-between"
          ></HStack>
        </ImageBackground>

        <HStack marginY={3} justifyContent="space-between">
          <Text fontSize={"12px"} bold color={"#000000"} flex={1}>
            {food}
          </Text>
          <Text fontSize={"12px"} bold color={"#000000"}>
            {price} KZ
          </Text>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}
