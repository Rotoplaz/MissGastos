import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { useState } from "react";
import Profile from "./profile";
import InitialScreen from "./initial";
import YourCards from "./yourCards";
import AddCard from "./addCard";
import WatchCard from "./watchCard";
import EditCard from "./editCard";
import History from "./history";
import GeneratePDF from "@/presentation/screens/pdf-generator/generatePDF";

export default function Index() {
  const [counter, setCounter] = useState(0);

  return <GeneratePDF />;
}
