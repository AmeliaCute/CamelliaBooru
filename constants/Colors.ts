/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#A670DCFF';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    SecondText: '#252525FF',

    textInputBoxImportant: '#E5CFFC',
    textInputColorImportant: '#7648A3',
    textInputOutlineImportant: '#7648A3',

    textInputBoxNormal: '#E4E4E4',
    textInputColorNormal: '#838383',
    textInputOutlineNormal: '#B4B4B4',

    headerBackground: "#A670DCFF",

    headerObjectBackground: "#B785EAFF",
    headerObjectBorder: "#D1ACF6FF",

    red: "#DF5050FF",
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    SecondText: '#ECEDEE',

    textInputBoxImportant: '#917DA6',
    textInputColorImportant: '#DDBEFC',
    textInputOutlineImportant: '#DDBEFC',

    textInputBoxNormal: '#2D2D2D',
    textInputColorNormal: '#C2C2C2',
    textInputOutlineNormal: '#8E8E8E',

    headerBackground: "#7836BF",

    headerObjectBackground: "#8E55CC",
    headerObjectBorder: "#A473D8",

    red: "#B34141FF",
  },
};