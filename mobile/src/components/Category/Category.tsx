import { HStack, Text, VStack } from "native-base";
import { ImageBackground, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigatorParams } from "../../routes";

export type CategoryProps = {
  id: string,
  name: string,
};


export function Category({
  id,
  name,
}: CategoryProps) {
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
              {name}
            </Text>

          </VStack>

          <Text fontSize={"18px"} bold color={"#DD1E1E"} marginLeft={4} marginTop={4}>
            {12} KZ
          </Text>
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}
