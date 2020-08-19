import { Platform } from 'react-native';

const Styles = {
  app: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  FontSize: {
    tiny: 12,
    small: 14,
    medium: 16,
    big: 18,
    large: 20,
  },
  IconSize: {
    TextInput: 25,
    ToolBar: 18,
    Inline: 20,
    SmallRating: 14,
  },
  SignInHeaderStyle: {
    color: 'white',
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold',
  },
  AppHeaderStyle: {
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
    },
    headerStyle: {
      ...Platform.select({
        ios: {
          height: 40,
        },
        android: {
          height: 57,
        },
      }),
    },
    headerTintColor: 'black',
    backgroundColor: 'rgb(104,	42,	163	)',
  },
  PrimaryColor: 'rgb(153,	47,	172	)',
  PrimaryColor2: 'rgb(92,	37,	145	)',
  PrimaryColor3: 'rgb(168,	44,	136	)',
};

export default Styles;
