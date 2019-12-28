import React from 'react';
import {
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
  Picker,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Title,
  Left,
  Radio,
  Right,
  Body,
  Input,
  Item,
  Footer,
  View,
  FooterTab,
  Badge,
  Label,
  Form,
} from 'native-base';
import RadioGroup from 'react-native-custom-radio-group';

import NavigationService from '@Service/Navigation';

import Style from '@Theme/Style';
import Styles from '@Screen/Public/PropertySearch/Style';

import SelectInput from 'react-native-select-input-ios';

//const {width, height} = Dimensions.get('window')
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export const propertyType = [
  {
    label: 'Satılık',
    value: 'type_buy',
  },
  {
    label: 'Kiralık',
    value: 'type_rent',
  },
  {
    label: 'Tümü',
    value: 'type_all',
  },
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'type_buy',
      sliderOneChanging: false,
      sliderOneValue: [10000],
      multiSliderValue: [100, 100000],
      language1: 'Min',
      language2: 'Max',
      oda: 'Tumu',
      banyo: 'Tumu',
      sehir: 'Tumu',
      bolge: 'Tumu',
      text1: '',
      radio1: '',
      dataSourceIlceler: [],
    };
  }

  onValueChange(value) {
    this.setState({
      sehir: value,
    });
  }

  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true,
    });
  };

  sliderOneValuesChange = values => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues,
    });
  };

  sliderOneValuesChangeFinish = () => {
    this.setState({
      sliderOneChanging: false,
    });
  };

  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values,
    });
  };

  async componentDidMount() {
    let response = await fetch(
      'https://emlakdunyasi.enuox.com/json=ilce/sehir=0',
    );
    let responseJson = await response.json();

    this.setState(
      {
        isLoading: false,
        dataSourceIlceler: responseJson.bolgeler,
      },
      function() {},
    );
  }

  onSubmitEditing(value) {
    this.setState({
      oda: value,
    });
  }

  onSubmitEditing2(value) {
    this.setState({
      sehir: value,
    });

    this.handleSubmit(value);
  }

  onSubmitEditing3(value) {
    this.setState({
      bolge: value,
    });
  }

  getPickerOptions() {
    return this.state.dataSourceIlceler;
  }

  onSubmitEditingLanguage1(value) {
    this.setState({
      language1: value,
    });

    this.handleSubmit(value);
  }

  onSubmitEditingLanguage2(value) {
    this.setState({
      language2: value,
    });

    this.handleSubmit(value);
  }

  async handleSubmit(value) {
    var yeniurl = 'https://emlakdunyasi.enuox.com/json=ilce/sehir=0';
    switch (value) {
      case '2':
        yeniurl = 'https://emlakdunyasi.enuox.com/json=ilce/sehir=2';
        break;
      case '3':
        yeniurl = 'https://emlakdunyasi.enuox.com/json=ilce/sehir=3';
        break;
      case '4':
        yeniurl = 'https://emlakdunyasi.enuox.com/json=ilce/sehir=4';
        break;
      case '5':
        yeniurl = 'https://emlakdunyasi.enuox.com/json=ilce/sehir=5';
        break;
      case '6':
        yeniurl = 'https://emlakdunyasi.enuox.com/json=ilce/sehir=6';
        break;
      case '7':
        yeniurl = 'https://emlakdunyasi.enuox.com/json=ilce/sehir=7';
        break;
      case '8':
        yeniurl = 'https://emlakdunyasi.enuox.com/json=ilce/sehir=8';
        break;
    }

    let response = await fetch(yeniurl);
    let responseJson = await response.json();

    const optionsBolge = [{value: 'deneme', label: 'deneme'}];

    this.setState(
      {
        isLoading: false,
        dataSourceIlceler: responseJson.bolgeler,
      },
      function() {},
    );
  }

  render() {
    const optionsBolge = [{value: 'deneme', label: 'jhjgkj'}];
    const optionsOda = [
      {value: 'Tumu', label: 'Tümü'},
      {value: '1+0', label: '1+0'},
      {value: '1+1', label: '1+1'},
      {value: '2+1', label: '2+1'},
      {value: '3+1', label: '3+1'},
      {value: '4+1', label: '4+1'},
      {value: '5+1', label: '5+1'},
      {value: '2+2', label: '2+2'},
      {value: '3+2', label: '3+2'},
      {value: '4+2', label: '4+2'},
      {value: '5+2', label: '5+2'},
      {value: '6+1', label: '6+1'},
      {value: '7+1', label: '7+1'},
    ];

    const optionsSehir = [
      {value: 'Tumu', label: 'Tümü'},
      {value: '2', label: 'LEFKOŞA'},
      {value: '3', label: 'GİRNE'},
      {value: '4', label: 'MAGUSA'},
      {value: '5', label: 'GÜZELYURT'},
      {value: '6', label: 'İSKELE'},
      {value: '7', label: 'LEFKE'},
      {value: '8', label: 'KARPAZ'},
    ];

    const optionsLanguage1 = [
      {value: 'Min', label: 'Min'},
      {value: '100', label: '£100'},
      {value: '250', label: '£250'},
      {value: '500', label: '£500'},
      {value: '1000', label: '£1,000'},
      {value: '5000', label: '£5,000'},
      {value: '10000', label: '£10,000'},
      {value: '20000', label: '£20,000'},
      {value: '30000', label: '£30,000'},
      {value: '40000', label: '£40,000'},
      {value: '50000', label: '£50,000'},
      {value: '100000', label: '£100,000'},
      {value: '150000', label: '£150,000'},
      {value: '200000', label: '£200,000'},
      {value: '300000', label: '£300,000'},
      {value: '400000', label: '£400,000'},
      {value: '500000', label: '£500,000'},
      {value: '1000000', label: '£1,000,000'},
    ];

    const optionsLanguage2 = [
      {value: 'Max', label: 'Max'},
      {value: '25000', label: '£25,000'},
      {value: '50000', label: '£50,000'},
      {value: '100000', label: '£100,000'},
      {value: '150000', label: '£150,000'},
      {value: '200000', label: '£200,000'},
      {value: '300000', label: '£300,000'},
      {value: '400000', label: '£400,000'},
      {value: '500000', label: '£500,000'},
      {value: '750000', label: '£750,000'},
      {value: '1000000', label: '£1,000,000'},
      {value: '1500000', label: '£1,500,000'},
      {value: '2000000', label: '£2,000,000'},
      {value: '2500000', label: '£2,500,000'},
      {value: '4000000', label: '£4,000,000'},
      {value: '5000000', label: '£5,000,000'},
    ];

    return (
      <Container style={Style.bgMain}>
        <Header style={Style.navigation}>
          <StatusBar
            backgroundColor="#7E8BF5"
            animated
            barStyle="light-content"
          />

          <View style={Style.actionBarLeft}>
            <Button
              transparent
              style={Style.actionBarBtn}
              onPress={() => {
                this.props.navigation.navigate('PublicHome');
              }}>
              <Icon
                active
                name="arrow-left"
                style={Style.textWhite}
                type="MaterialCommunityIcons"
              />
            </Button>
          </View>
          <View style={Style.actionBarMiddle}>
            <Text style={Style.actionBarText}>{'Ara'.toUpperCase()}</Text>
          </View>
          <View style={Style.actionBarRight} />
        </Header>

        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}>
          <ScrollView ref="scrollView" />
          <View style={Styles.section}>
            <View style={Styles.type}>
              <RadioGroup
                containerStyle={Styles.typeBg}
                initialValue={'type_buy'}
                buttonContainerStyle={Styles.typeBtn}
                buttonTextStyle={Styles.typeBtnText}
                buttonContainerActiveStyle={Styles.typeBtnActive}
                buttonContainerInactiveStyle={Styles.typeBtnInactive}
                buttonTextActiveStyle={Styles.typeActiveText}
                buttonTextInactiveStyle={Styles.typeInactiveText}
                radioGroupList={propertyType}
                onChange={selected => {
                  this.setState({selected: selected});
                }}
              />
            </View>
            <View style={Styles.location}>
              <Label style={Styles.label}>Başlık</Label>
              <TextInput
                style={Styles.textInput}
                placeholder={'e.g. Brixton, NW3 or NW3 5TY'}
                onChangeText={text1 => this.setState({text1: text1})}
              />
            </View>

            <View style={Styles.price}>
              <Label style={Styles.labelPrice}>Oda Sayısı - Banyo</Label>
            </View>

            <View style={Styles.price}>
              <Label style={Styles.labelPrice}>Şehir - Bölge</Label>

              <SelectInput
                style={Styles.selectedPicker}
                value={this.state.sehir}
                onSubmitEditing={this.onSubmitEditing2.bind(this)}
                options={optionsSehir}
              />

              <SelectInput
                style={Styles.selectedPicker}
                value={this.state.bolge}
                onSubmitEditing={this.onSubmitEditing3.bind(this)}
                options={[{value: 'sda', label: 'sadaw'}]}
              />

              <Picker
                style={{height: 50, width: 100}}
                selectedValue={this.state.bolge}
                mode="dialog"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({bolge: itemValue})
                }>
                <Picker.Item label="Tümü" value="Tumu" />
                {this.state.dataSourceIlceler.length > 0 &&
                  this.state.dataSourceIlceler.map(key => (
                    <Picker.Item label={key.bolge} value={key.bolge} />
                  ))}
              </Picker>
            </View>

            <View style={Styles.price}>
              <Label style={Styles.labelPrice}>Fiyat</Label>

              <SelectInput
                style={Styles.selectedPicker}
                value={this.state.language1}
                onSubmitEditing={this.onSubmitEditingLanguage1.bind(this)}
                options={optionsLanguage1}
              />

              <SelectInput
                style={Styles.selectedPicker}
                value={this.state.language2}
                onSubmitEditing={this.onSubmitEditingLanguage2.bind(this)}
                options={optionsLanguage2}
              />
            </View>

            <View style={Styles.btnBg}>
              <Button
                style={Styles.btn}
                onPress={() => {
                  this.props.navigation.navigate('SearchDetail', {
                    baslik: this.state.text1,
                    min: this.state.language1,
                    max: this.state.language2,
                    tipi: this.state.selected,
                    oda: this.state.oda,
                    banyo: this.state.banyo,
                    sehir: this.state.sehir,
                    bolge: this.state.bolge,
                  });
                }}>
                <Text style={Styles.btnText}>{'Ara'.toUpperCase()}</Text>
                <Icon
                  active
                  name="search"
                  type="FontAwesome"
                  style={Styles.btnIcon}
                />
              </Button>
            </View>
          </View>
        </Content>

        <Footer style={Style.greyTopLine}>
          <FooterTab style={Style.bgBot}>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate('PublicHome');
              }}>
              <Icon name="home" type="FontAwesome" style={Style.textBlue} />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate('PublicPropertySearch');
              }}>
              <Icon
                name="search"
                type="Octicons"
                style={Style.textBlueActive}
              />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate('MemberHome');
              }}>
              <Icon name="user" type="FontAwesome" style={Style.textBlue} />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate('MemberFavorites');
              }}>
              <Icon
                name="info-with-circle"
                type="Entypo"
                style={Style.textBlue}
              />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate('MemberMessages');
              }}>
              <Icon
                name="address-card"
                type="FontAwesome"
                style={Style.textBlue}
              />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

// Oda Sayısı

// <View style={Styles.col}>
//     <View style={Styles.pricePicker}>
//         <Picker
//             selectedValue={this.state.oda}
//             style={Styles.priceSelect}
//             onValueChange={(itemValue, itemIndex) => this.setState({ oda: itemValue })}>
//             <Picker.Item label="Tümü" value="Tumu" />
//             <Picker.Item label="1+1" value="1+1" />
//             <Picker.Item label="2+1" value="2+1" />
//             <Picker.Item label="3+1" value="3+1" />
//             <Picker.Item label="4+1" value="4+1" />
//             <Picker.Item label="5+1" value="5+1" />
//             <Picker.Item label="2+2" value="2+2" />
//             <Picker.Item label="3+2" value="3+2" />
//             <Picker.Item label="4+2" value="4+2" />
//             <Picker.Item label="5+2" value="5+2" />
//             <Picker.Item label="6+1" value="6+1" />
//             <Picker.Item label="7+1" value="7+1" />
//         </Picker>
//     </View>
//     <View style={Styles.pricePicker}>
//         <Picker
//           selectedValue={this.state.banyo}
//           style={Styles.priceSelect}
//           onValueChange={(itemValue, itemIndex) => this.setState({ banyo: itemValue })}>
//             <Picker.Item label="Tümü" value="Tumu" />
//             <Picker.Item label="1" value="1" />
//             <Picker.Item label="2" value="2" />
//             <Picker.Item label="3" value="3" />
//             <Picker.Item label="4" value="4" />
//             <Picker.Item label="5" value="5" />
//         </Picker>
//     </View>
// </View>
