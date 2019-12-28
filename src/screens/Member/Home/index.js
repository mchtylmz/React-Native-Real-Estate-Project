import React from 'react';
import {
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
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
  Right,
  Body,
  Input,
  Item,
  Footer,
  View,
  FooterTab,
  Badge,
} from 'native-base';

import NavigationService from '@Service/Navigation';

import MESSAGES from './Messages';

import Style from '@Theme/Style';
import Styles from '@Screen/Member/Home/Style';

//const {width, height} = Dimensions.get('window')
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const {width} = Dimensions.get('window');
const height = width * 0.8;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    return fetch('https://emlakdunyasi.enuox.com/json=kadro')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSourceKadromuz: responseJson.data,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
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
            <Text style={Style.actionBarText}>{'Kadromuz'.toUpperCase()}</Text>
          </View>
          <View style={Style.actionBarRight} />
        </Header>

        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}>
          <View style={Styles.sectionGrey}>
            <FlatList
              data={this.state.dataSourceKadromuz}
              style={Styles.flatList}
              renderItem={({id, item}) => (
                <View style={Styles.agent}>
                  <TouchableOpacity
                    style={Styles.btnAgent}
                    onPress={() => {
                      this.props.navigation.navigate('PublicAgentDetail', {
                        kisiID: item.id,
                      });
                    }}>
                    <Image
                      source={{uri: item.resim}}
                      resizeMode={'contain'}
                      style={Styles.btnAgentImg}
                    />
                    <View style={Styles.btnAgentLocation}>
                      <Text style={Styles.btnAgentText}>{item.adi}</Text>
                      <Text style={Styles.btnAgentCity}>{item.isi}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
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
              <Icon name="search" type="Octicons" style={Style.textBlue} />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate('MemberHome');
              }}>
              <Icon
                name="user"
                type="FontAwesome"
                style={Style.textBlueActive}
              />
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
