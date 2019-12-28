import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge } from 'native-base'

import NavigationService from '@Service/Navigation'

import FEATURED from './Featured'


import Style from '@Theme/Style'
import Styles from '@Screen/Public/Properties/Style'

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {

  constructor(props){
     super(props);
     this.state ={ isLoading: true,
       pageTitle: '',
                }
   }

   componentDidMount(){
     const cityID = this.props.navigation.getParam('cityID', '0');

     return fetch('https://emlakdunyasi.enuox.com/json=populer/city='+parseInt(cityID),{headers:{'charset': 'utf-8'}})
       .then((response) => response.json())
       .then((responseJson) => {

          switch (cityID) {
            case '1':
              var _page = 'LEFKOŞA'
              break;
            case '2':
              var _page = 'GİRNE'
              break;
            case '3':
              var _page = 'İSKELE'
              break;
            case '4':
              var _page = 'LEFKE'
              break;
            default:
               var _page = ''
          }

         this.setState({
           isLoading: false,
           dataSourceCity: responseJson.city,
           pageTitle: _page
         }, function(){

         });

       })
       .catch((error) =>{
         console.error(error);
       });
   }
    render() {
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        this.props.navigation.navigate('PublicHome')
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{this.state.pageTitle}</Text>
                </View>
                <View style={Style.actionBarRight}>
                </View>
            </Header>


            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.section}>
                  <FlatList
                      data={this.state.dataSourceCity}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, separators }) => (
                          <TouchableOpacity style={Styles.item} underlayColor='transparent' onPress={() => { this.props.navigation.navigate('PublicPropertyDetail',{emlakID:item.id}) }}>
                              <View>
                                  <View>
                                      <Image source={{ uri: item.resim }} style={Styles.itemImg} />
                                  </View>
                                  <Text style={Styles.itemPrice}>{htmlEscape(item.baslik)}</Text>
                                  <Text style={Styles.itemPrice}>{item.fiyat}</Text>
                                  <Text style={Styles.itemLocation}>{htmlEscape(item.tipi)}</Text>
                                  <View style={Styles.itemRow}>
                                      <View style={Styles.itemOverview}>
                                          <Icon name="bed" type="FontAwesome" style={Styles.itemIcon} />
                                          <Text style={Styles.itemNo}>{item.oda}</Text>
                                      </View>
                                      <View style={Styles.itemOverview}>
                                          <Icon name="bathtub" type="FontAwesome" style={Styles.itemIcon} />
                                          <Text style={Styles.itemNo}>{item.banyo}</Text>
                                      </View>
                                      <View style={Styles.itemOverview}>
                                          <Icon name="expand" type="FontAwesome" style={Styles.itemIcon} />
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
    }
}
function htmlEscape(str){
    return str.replace("&#39;","'").replace("&#39;","'").replace("&#39;","'").replace("&#39;","'")
    .replace("&#214;","Ö").replace("&#214;","Ö").replace("&#214;","Ö").replace("&#214;","Ö")
    .replace("&#220;","Ü").replace("&#220;","Ü").replace("&#220;","Ü").replace("&#220;","Ü")
    .replace("&#199;","Ç").replace("&#199;","Ç").replace("&#199;","Ç").replace("&#199;","Ç")
    .replace("&#246;","ö").replace("&#246;","ö").replace("&#246;","ö").replace("&#246;","ö")
    .replace("&#252;","ü").replace("&#252;","ü").replace("&#252;","ü").replace("&#252;","ü")
    .replace("&#231;","ç").replace("&#231;","ç").replace("&#231;","ç").replace("&#231;","ç")

}
