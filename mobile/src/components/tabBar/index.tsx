import React, { useContext, useEffect, useState } from "react";
import { HStack, Box, Modal, FormControl, Input, Button, Center, Select, CheckIcon } from "native-base";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TabNavigatorParams } from "../../routes/routes.types";
import { TouchableOpacity, } from "react-native";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { api } from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TransactionContext, TypeTransaction } from "../../contexts/transactionsContext";

type Props = {
  props: BottomTabBarProps;
};
const ICON_SIZE = 30;


export function TabBar({ props }: Props) {
  const { navigate } = useNavigation<NavigationProp<TabNavigatorParams>>();
  const activeTabIndex = props.state.index;
  const [showModal, setShowModal] = useState(false);
  const [date, setDates] = useState(new Date())
  const [type, setType] = useState<TypeTransaction>("INCOME");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");


  const {
    createTransaction,
    categories,
    getCategories

  } = useContext(TransactionContext);


  useEffect(() => { getCategories() }, [])


  const setDate = (event: DateTimePickerEvent, date: Date) => {
    setDates(date)
  };

  return (
    <HStack
      style={{
        height: 60,
        justifyContent: "space-evenly",
        width: "96%",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginBottom: 2,
        borderRadius: 25,
        position: "absolute",
        bottom: 0,
      }}
    >
      <TouchableOpacity onPress={() => navigate("home")} activeOpacity={0.7}>
        <Box padding={2}>
          <AntDesign
            name="home"
            size={ICON_SIZE}
            color={activeTabIndex === 0 ? "#5ADCA2" : "#ccc"}
          />
        </Box>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate("report")} activeOpacity={0.7}>
        <Box>
          <Feather
            name="shopping-bag"
            size={ICON_SIZE}
            color={activeTabIndex === 1 ? "#5ADCA2" : "#ccc"}
          />
        </Box>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowModal(true)} activeOpacity={0.7}>
        <Box marginTop={-10} zIndex={10} bg="#5ADCA2" borderRadius={100}>
          <EvilIcons
            name="plus"
            size={60}
            color={"white"}
          />
        </Box>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Nova Transação</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Data</FormControl.Label>
                <RNDateTimePicker mode="datetime" value={date} onChange={setDate} />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Tipo</FormControl.Label>
                <Center>
                  <Box >
                    <Select selectedValue={type} minWidth="290" _selectedItem={{
                      bg: "teal.100",
                      endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setType(itemValue as TypeTransaction)}>
                      <Select.Item label="INCOME" value="INCOME" />
                      <Select.Item label="OUTCOME" value="OUTCOME" />
                    </Select>
                  </Box>
                </Center>
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Categoria</FormControl.Label>
                <Center>
                  <Box >
                    <Select selectedValue={category} minWidth="290" _selectedItem={{
                      bg: "teal.100",
                      endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setCategory(itemValue)}>
                      {categories.map((category) => (
                        <Select.Item label={category.name} value={category.id} />
                      ))}
                    </Select>
                  </Box>
                </Center>
              </FormControl>
              <FormControl>
                <FormControl.Label>Valor</FormControl.Label>
                <Input
                  onChangeText={setValue}
                  value={value}
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Descrição</FormControl.Label>
                <Input
                  onChangeText={setDescription}
                  value={description}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group >
                <Button width={290} colorScheme="green" onPress={async () => {
                  setShowModal(false);

                  createTransaction({ category_id: category, date: date.toDateString(), description, type, value: Number(value) })

                }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate("categories")}
        activeOpacity={0.7}
      >
        <Box>
          <AntDesign
            name="hearto"
            size={ICON_SIZE}
            color={activeTabIndex === 2 ? "#5ADCA2" : "#ccc"}
          />
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate("user")} activeOpacity={0.7}>
        <Box>
          <AntDesign
            name="user"
            size={ICON_SIZE}
            color={activeTabIndex === 3 ? "#5ADCA2" : "#ccc"}
          />
        </Box>
      </TouchableOpacity>
    </HStack >
  );
}
