//https://github.com/AdelRedaa97/react-native-select-dropdown/blob/master/examples/demo2.js
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, Text, View, Button, ToastAndroid, ImageBackground } from "react-native";

import { countryDataSmall, createCities } from "../Assets/citiesSmall"; // Import the function to create cities
import SelectDropdown from "react-native-select-dropdown";
import { useGamePlayStyles } from "../AllStyles/gamePlayStyles";

export default function GamePlay({ navigation, route }) {
  const styles = useGamePlayStyles();
  // console.log("countryDataSmallGamePlay", countryDataSmall);
  // console.log("createCities()Gameplay", createCities());

  // State for all country data and dropdown cities
  const [allData] = useState(countryDataSmall);
  const [allCities, setAllCities] = useState(createCities());
  const [gameData, setGameData] = useState({
    CountryName: "Start",
    CapitalName: "Start",
    CapitalLatitude: 0,
    CapitalLongitude: 0,
    ContinentName: "Start",
  }); //holds the selected country details

  const [selectedCity, setSelectedCity] = useState(null);
  const [number, setNumber] = useState(0); //random number
  // State for correct and wrong answers
  const [citiesCorrect, setCitiesCorrect] = useState([]);
  const [citiesWrong, setCitiesWrong] = useState([]);
  // Ref for dropdown reset
  const citiesDropdownRef = useRef({});

  // Helper: Get a random integer between min and max (inclusive)
  const getRandomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  // Handler: Load new random country/city for the game
  const onClickChooseCountry = () => {
    console.log("Button pressed");
    // Update dropdown data (if needed)
    console.log("Updating cities dropdown data", createCities());
    setAllCities(createCities());

    // Pick a random country
    const randomNumber = getRandomNumberBetween(0, allData.length - 1);
    console.log("Random number selected:", randomNumber);
    const selecteditem = allData[randomNumber];
    console.log("Selected item:", selecteditem);
    // Set game data for the selected country
    setGameData({
      CountryName: selecteditem.CountryName,
      CapitalName: selecteditem.CapitalName,
      CapitalLatitude: selecteditem.CapitalLatitude,
      CapitalLongitude: selecteditem.CapitalLongitude,
      ContinentName: selecteditem.ContinentName,
    });

    // Reset selected city
    setSelectedCity(null);

    // Reset dropdown selection
    if (citiesDropdownRef.current && citiesDropdownRef.current.reset) {
      citiesDropdownRef.current.reset();
    }
  };

  // Handler: Check if the selected city is correct or wrong
  const CheckForWinnerLoser = () => {
    if (selectedCity && selectedCity !== "" && gameData.CapitalName !== "Start") {
      if (selectedCity === gameData.CapitalName) {
        ToastAndroid.showWithGravity("You win! The city is " + selectedCity, ToastAndroid.LONG, ToastAndroid.CENTER);
        setCitiesCorrect((prev) => [...prev, selectedCity]);
      } else {
        ToastAndroid.showWithGravity(
          `You are wrong! The city is ${gameData.CapitalName}, you said ${selectedCity}`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        setCitiesWrong((prev) => [...prev, selectedCity]);
        // Optionally: insertData(selectedCity);
      }
    }
  };
  // Effect: Run winner/loser check when selectedCity changes
  useEffect(() => {
    if (selectedCity) CheckForWinnerLoser();
    // eslint-disable-next-line
  }, [selectedCity]);

  // Section component for displaying game info
  const Section = ({ title }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text>The city is {gameData.CapitalName || ""}</Text>
      <Text>The Country is {gameData.CountryName || ""}</Text>
      <Text>The Continent is {gameData.ContinentName || ""}</Text>
    </View>
  );
  return (
    // <ImageBackground resizeMode="cover" source={require("../Assets/bgImage.png")} style={styles.image}>
    <SafeAreaView style={styles.container}>
      {/* Game Info Section */}
      <Section title="Test your City knowledge" />

      {/* Button to choose a random country */}
      <Button title="Choose a random Country" onPress={onClickChooseCountry} />

      <View style={{ width: "100%", marginVertical: 16 }}>
        <SelectDropdown
          ref={citiesDropdownRef}
          data={allCities}
          onSelect={(selectedItem) => setSelectedCity(selectedItem)}
          defaultButtonText={"Choose the city"}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          ImageBackgroundcolor={"#fff"}
        />
      </View>

      {/* Results: Correct and Wrong Cities */}
      <View style={[styles.container, { flexDirection: "row", alignContent: "space-between" }]}>
        <View style={styles.resultcontainer}>
          <ScrollView>
            <Text style={styles.headingoutome}>Correct Cities</Text>
            {citiesCorrect.map((item, index) => (
              <View key={index}>
                <Text style={styles.item}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.resultcontainer}>
          <ScrollView>
            <Text style={[styles.headingoutome, { marginLeft: 50, alignSelf: "flex-end" }]}>Wrong Cities</Text>
            {citiesWrong.map((item, index) => (
              <View key={index}>
                <Text style={[styles.item, { marginLeft: 50, alignSelf: "flex-end" }]}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
    // </ImageBackground>
  );
}
