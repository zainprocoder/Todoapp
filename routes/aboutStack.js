import { createStackNavigator } from "react-navigation-stack";
import About from "../screens/about";
import Header from "../shared/header";
import react from "react";

const screens = {
  About: {
    screen: About,
    // navigationOptions: {
    //     headerTitle: () => <Header/>
    // }
    navigationOptions: ({ navigation }) => {
      return { headerTitle: () => <Header navigation={navigation} /> };
    },
  },
};
const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "orange", height: 100 },
  },
});

export default AboutStack;
