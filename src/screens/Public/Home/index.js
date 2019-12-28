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
  ActivityIndicator,
  WebView,
  NetInfo,
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
import RadioGroup from 'react-native-custom-radio-group';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import HTMLView from 'react-native-htmlview';
import NavigationService from '@Service/Navigation';

import FEATURED from './Featured';
import TOPCITIES from './TopCities';
import AGENTS from './Agents';

import Style from '@Theme/Style';
import Styles from '@Screen/Public/Home/Style';

//const {width, height} = Dimensions.get('window')
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const drawerImage = require('@Asset/images/avatarki.png');

const styles = StyleSheet.create({
  // Make sure to add all tags you want to customize
  h1: {
    fontFamily: 'YourCustomFontFamilyName',
  },
  h2: {
    fontFamily: 'YourCustomFontFamilyName',
  },
  p: {
    fontSize: 32,
  },
});
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, selectedIndex: 0};
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  async componentDidMount() {
    let response = await fetch('https://emlakdunyasi.enuox.com/json=anasayfa');
    let responseJson = await response.json();

    this.setState(
      {
        isLoading: false,
        dataSourceSatilik: responseJson.satilik,
        dataSourceKiralik: responseJson.kiralik,
        dataSourceKesfet: responseJson.kesfet,
      },
      function() {},
    );
  }

  render() {
    if (this.state.isLoading) {
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
                style={Style.actionMenu}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}>
                <Image source={require('@Asset/images/menu.png')} />
              </Button>
            </View>
            <View style={Style.actionBarMiddle}>
              <Image square style={styles.actionBarText} source={drawerImage} />
            </View>
            <View style={Style.actionBarRight} />
          </Header>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator />
          </View>
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
                <Icon name="user" type="FontAwesome" style={Style.textActive} />
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
              style={Style.actionMenu}
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <Image source={require('@Asset/images/menu.png')} />
            </Button>
          </View>
          <View style={Style.actionBarMiddle}>
            <Image square style={styles.actionBarText} source={drawerImage} />
          </View>
          <View style={Style.actionBarRight} />
        </Header>

        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}>
          <View style={Styles.btnLayout}>
            <SegmentedControlTab
              tabsContainerStyle={Styles.typeBg}
              tabStyle={Styles.typeBtn}
              tabTextStyle={Styles.typeBtnText}
              activeTabStyle={Styles.typeBtnActive}
              activeTabTextStyle={Styles.typeActiveText}
              values={['KEŞFET', 'SATILIK', 'KİRALIK']}
              selectedIndex={this.state.selectedIndex}
              onTabPress={this.handleIndexChange}
            />
          </View>

          {this.state.selectedIndex === 0 && [
            <>
              <View key="view1">
                <ImageBackground
                  source={require('@Asset/images/property-bg.png')}
                  imageStyle={'cover'}
                  style={Styles.slider}>
                  <FlatList
                    data={this.state.dataSourceKesfet}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={Styles.flatList}
                    renderItem={({id, item}) => (
                      <TouchableOpacity
                        style={Styles.itemBig}
                        underlayColor="transparent"
                        onPress={() => {
                          this.props.navigation.navigate('PublicPropertyDetail', {
                            emlakID: item.id,
                          });
                        }}>
                        <View>
                          <View>
                            <Image
                              source={{uri: item.resim}}
                              style={Styles.itemImgBig}
                            />
                            <View style={Styles.itemNoCrv} />
                          </View>
                          <View style={Styles.itemBg}>
                            <Text style={Styles.itemPrice}>
                              {htmlEscape(item.baslik)}
                            </Text>
                            <Text style={Styles.itemPrice}>{item.fiyat}</Text>
                            <Text style={Styles.itemLocation}>
                              {htmlEscape(item.tipi)}
                            </Text>
                            <View style={Styles.itemRow}>
                              <View style={Styles.itemOverview}>
                                <Icon
                                  name="bed"
                                  type="FontAwesome"
                                  style={Styles.itemIcon}
                                />
                                <Text style={Styles.itemNo}>{item.oda}</Text>
                              </View>
                              <View style={Styles.itemOverview}>
                                <Icon
                                  name="bathtub"
                                  type="FontAwesome"
                                  style={Styles.itemIcon}
                                />
                                <Text style={Styles.itemNo}>{item.banyo}</Text>
                              </View>
                              <View style={Styles.itemOverview}>
                                <Icon
                                  name="expand"
                                  type="FontAwesome"
                                  style={Styles.itemIcon}
                                />
                                <Text style={Styles.itemNo}>{item.alan}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </ImageBackground>
              </View>

              <View key="view2" style={Styles.sectionGrey}>
                <View style={Styles.headerBg}>
                  <Icon
                    name="map-marker-multiple"
                    type="MaterialCommunityIcons"
                    style={Styles.headerIcon}
                  />
                  <Text style={Styles.sHeader}>
                    {'Popüler Şehirler'.toUpperCase()}
                  </Text>
                </View>
                <View style={Styles.city}>
                  <TouchableOpacity
                    style={Styles.btnCity}
                    onPress={() => {
                      this.props.navigation.navigate('PublicProperties', {
                        cityID: '1',
                        deneme: '2',
                      });
                    }}>
                    <Image
                      source={{
                        uri: 'https://i.imgyukle.com/2019/08/25/oxN1LU.jpg',
                      }}
                      resizeMode={'cover'}
                      style={Styles.btnCityImg}
                    />
                    <View style={Styles.btnCityLocation}>
                      <Text style={Styles.btnCityText}>LEFKOŞA</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Styles.btnCity}
                    onPress={() => {
                      this.props.navigation.navigate('PublicProperties', {
                        cityID: '2',
                      });
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://www.visitbritain.com/sites/default/files/consumer_destinations/teaser_images/manchester_town_hall.jpg',
                      }}
                      resizeMode={'cover'}
                      style={Styles.btnCityImg}
                    />
                    <View style={Styles.btnCityLocation}>
                      <Text style={Styles.btnCityText}>GİRNE</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Styles.btnCity}
                    onPress={() => {
                      this.props.navigation.navigate('PublicProperties', {
                        cityID: '3',
                      });
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://i2-prod.birminghampost.co.uk/business/commercial-property/article13376659.ece/ALTERNATES/s615/Hotel-la-Tour-1.jpg',
                      }}
                      resizeMode={'cover'}
                      style={Styles.btnCityImg}
                    />
                    <View style={Styles.btnCityLocation}>
                      <Text style={Styles.btnCityText}>İSKELE</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Styles.btnCity}
                    onPress={() => {
                      this.props.navigation.navigate('PublicProperties', {
                        cityID: '4',
                      });
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://calvium.com/calvium/wp-content/uploads/2014/07/shutterstock_129753212.jpg',
                      }}
                      resizeMode={'cover'}
                      style={Styles.btnCityImg}
                    />
                    <View style={Styles.btnCityLocation}>
                      <Text style={Styles.btnCityText}>LEFKE</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>,
          ]}

          {this.state.selectedIndex === 1 &&
            ((
              <Container style={Style.bgMain}>
                <Content
                  style={Style.layoutInner}
                  contentContainerStyle={Style.layoutContent}>
                  <View style={Styles.section}>
                    <FlatList
                      data={this.state.dataSourceSatilik}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, separators}) => (
                        <TouchableOpacity
                          style={Styles.item}
                          underlayColor="transparent"
                          onPress={() => {
                            this.props.navigation.navigate('PublicPropertyDetail', {
                              emlakID: item.id,
                            });
                          }}>
                          <View>
                            <View>
                              <Image
                                source={{uri: item.resim}}
                                style={Styles.itemImg}
                              />
                            </View>
                            <Text style={Styles.itemPrice}>
                              {htmlEscape(item.baslik)}
                            </Text>
                            <Text style={Styles.itemPrice}>{item.fiyat}</Text>
                            <Text style={Styles.itemLocation}>
                              {htmlEscape(item.tipi)}
                            </Text>
                            <View style={Styles.itemRow}>
                              <View style={Styles.itemOverview}>
                                <Icon
                                  name="bed"
                                  type="FontAwesome"
                                  style={Styles.itemIcon}
                                />
                                <Text style={Styles.itemNo}>{item.oda}</Text>
                              </View>
                              <View style={Styles.itemOverview}>
                                <Icon
                                  name="bathtub"
                                  type="FontAwesome"
                                  style={Styles.itemIcon}
                                />
                                <Text style={Styles.itemNo}>{item.banyo}</Text>
                              </View>
                              <View style={Styles.itemOverview}>
                                <Icon
                                  name="expand"
                                  type="FontAwesome"
                                  style={Styles.itemIcon}
                                />
                                <Text style={Styles.itemNo}>{item.alan}</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </Content>
              </Container>
            ): null)}

          {this.state.selectedIndex === 2 &&
            ((
              <Container style={Style.bgMain}>
                <Content
                  style={Style.layoutInner}
                  contentContainerStyle={Style.layoutContent}>
                  <View style={Styles.section}>
                    <FlatList
                      data={this.state.dataSourceKiralik}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, separators}) => (
                        <TouchableOpacity
                          style={Styles.item}
                          underlayColor="transparent"
                          onPress={() => {
                            this.props.navigation.navigate('PublicPropertyDetail', {
                              emlakID: item.id,
                            });
                          }}>
                          <View>
                            <View>
                              <Image
                                source={{uri: item.resim}}
                                style={Styles.itemImg}
                              />
                            </View>
                            <Text style={Styles.itemPrice}>
                              {htmlEscape(item.baslik)}
                            </Text>
                            <Text style={Styles.itemPrice}>{item.fiyat}</Text>
                            <Text style={Styles.itemLocation}>
                              {htmlEscape(item.tipi)}
                            </Text>
                            <View style={Styles.itemRow}>
                              <View style={Styles.itemOverview}>
                                <Icon
                                  name="bed"
                                  type="FontAwesome"
                                  style={Styles.itemIcon}
                                />
                                <Text style={Styles.itemNo}>{item.oda}</Text>
                              </View>
                              <View style={Styles.itemOverview}>
                                <Icon
                                  name="bathtub"
                                  type="FontAwesome"
                                  style={Styles.itemIcon}
                                />
                                <Text style={Styles.itemNo}>{item.banyo}</Text>
                              </View>
                              <View style={Styles.itemOverview}>
                                <Icon
                                  name="expand"
                                  type="FontAwesome"
                                  style={Styles.itemIcon}
                                />
                                <Text style={Styles.itemNo}>{item.alan}</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </Content>
              </Container>
            ): null)}
        </Content>

        <Footer style={Style.greyTopLine}>
          <FooterTab style={Style.bgBot}>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate('PublicHome');
              }}>
              <Icon
                name="home"
                type="FontAwesome"
                style={Style.textBlueActive}
              />
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

function htmlEscape(str) {
  return str
    .replace('&#39;', "'")
    .replace('&#39;', "'")
    .replace('&#39;', "'")
    .replace('&#39;', "'")
    .replace('&#214;', 'Ö')
    .replace('&#214;', 'Ö')
    .replace('&#214;', 'Ö')
    .replace('&#214;', 'Ö')
    .replace('&#220;', 'Ü')
    .replace('&#220;', 'Ü')
    .replace('&#220;', 'Ü')
    .replace('&#220;', 'Ü')
    .replace('&#199;', 'Ç')
    .replace('&#199;', 'Ç')
    .replace('&#199;', 'Ç')
    .replace('&#199;', 'Ç')
    .replace('&#246;', 'ö')
    .replace('&#246;', 'ö')
    .replace('&#246;', 'ö')
    .replace('&#246;', 'ö')
    .replace('&#252;', 'ü')
    .replace('&#252;', 'ü')
    .replace('&#252;', 'ü')
    .replace('&#252;', 'ü')
    .replace('&#231;', 'ç')
    .replace('&#231;', 'ç')
    .replace('&#231;', 'ç')
    .replace('&#231;', 'ç');
}

// import React from 'react'
// import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
// import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge } from 'native-base'
// import RadioGroup from 'react-native-custom-radio-group'
//
// import NavigationService from '@Service/Navigation'
//
// import FEATURED from './Featured'
// import TOPCITIES from './TopCities'
// import AGENTS from './Agents'
//
//
// import Style from '@Theme/Style'
// import Styles from '@Screen/Public/Home/Style'
//
// //const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
//
// export const btnType = [{
//     label: 'BUY',
//     value: 'btn_buy'
// }, {
//     label: 'RENT',
//     value: 'btn_rent'
// }];
//
// export default class extends React.Component {
//   constructor(props){
//      super(props);
//      this.state ={ isLoading: true}
//    }
//
//    componentDidMount(){
//      return fetch('https://ylmz.pw/emlakdunyasi/test/')
//        .then((response) => response.json())
//        .then((responseJson) => {
//
//          this.setState({
//            isLoading: false,
//            dataSource: responseJson.data,
//          }, function(){
//
//          });
//
//        })
//        .catch((error) =>{
//          console.error(error);
//        });
//    }
//
//
//
//    render(){
//
//      if(this.state.isLoading){
//        return(
//          <View style={{flex: 1, padding: 20}}>
//            <ActivityIndicator/>
//          </View>
//        )
//      }
//
//      return(
//        <View style={{flex: 1, paddingTop:20}}>
//          <FlatList
//            data={this.state.dataSource}
//            renderItem={({item}) => <Text>{item.title}, {item.price}, {item.image}</Text>}
//            keyExtractor={({id}, index) => id}
//          />
//        </View>
//      );
//    }
//
// }
//
// <SegmentedControlTab
// tabsContainerStyle={Styles.typeBg}
// tabStyle={Styles.typeBtn}
// tabTextStyle={Styles.typeBtnText}
// activeTabStyle={Styles.typeBtnActive}
// activeTabTextStyle={Styles.typeActiveText}
// tabsContainerDisableStyle={Styles.typeBtnInactive}
// values={["Keşfet", "Satılık", "Kiralık"]}
// selectedIndex={this.state.selectedIndex}
// onTabPress={this.handleIndexChange} />
