import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X",
    title: "Uber X",
    multiplier: 1,
    image: require("../assets/Images/UberX.webp"),
  },
  {
    id: "Uber-XL",
    title: "Uber XL",
    multiplier: 1.2,
    image: require("../assets/Images/UberXL.webp"),
  },
  {
    id: "Uber-LUX",
    title: "Uber LUX",
    multiplier: 1.75,
    image: require("../assets/Images/Lux.webp"),
  },
];
const SURGE_CHARGE_RATE = 1.5;  
const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`top-1 rounded-full left-5 z-50 absolute`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-xl text-center px-20`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && 'bg-gray-200'}`}
            onPress={() => setSelected(item)}
            
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={image}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-bold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} travel time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "GBP",
              }).format(
                (travelTimeInformation?.duration.value*SURGE_CHARGE_RATE*multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-4 mx-20 rounded-full
          ${!selected && 'bg-gray-200'}`}>
          <Text style={tw`text-white text-center text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
