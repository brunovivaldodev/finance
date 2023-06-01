import { Box, HStack, Text, VStack } from "native-base";
import { ImageBackground, TouchableOpacity } from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigatorParams } from "../../routes";

export type LocalProps = {
  imageUri: string;
  seller: string;
  message: string;
  description: string;
  locationUri: string;
};
export function NearbyPlacesFood({
  imageUri,
  seller,
  message,
  description,
  locationUri,
}: LocalProps) {
  const { navigate } = useNavigation<NavigationProp<StackNavigatorParams>>();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigate("nearby", {
          imageUri,
          message,
          seller,
          description,
          locationUri,
        })
      }
    >
      <VStack style={{ width: 177 }}>
        <ImageBackground
          source={{ uri: imageUri }}
          style={{
            width: "100%",
            height: 154,
            alignItems: "flex-end",
          }}
          imageStyle={{ borderRadius: 15 }}
        >
          <HStack
            style={{
              width: 100,
              height: 34,
              backgroundColor: "#ccc",
              borderBottomLeftRadius: 20,
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 4,
            }}
          >
            <EvilIcons name="location" size={28} color="#fff" />
            <Text fontSize={"16px"} color={"#fff"} bold>
              1.5 KM
            </Text>
          </HStack>
        </ImageBackground>

        <VStack marginTop={1}>
          <HStack justifyContent="space-between">
            <Text fontSize={"18px"} bold color={"#000000"} flex={1}>
              {seller}
            </Text>
          </HStack>

          <HStack alignItems={"center"} space={1}>
            <AntDesign name="star" size={15} color="yellow" />
            <Text fontSize={"14px"} color={"#9D9D9D"}>
              5.0/ 105 pontos
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}
