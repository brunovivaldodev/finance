import { NativeBaseProvider } from "native-base";
import { Routes } from "./routes";

export default function AppContainer() {
  return (
    <NativeBaseProvider>
        <Routes/>
    </NativeBaseProvider>
  )
}