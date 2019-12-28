import React from 'react'
import { StatusBar, TouchableOpacity, TouchableHighlight, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, View, FlatList, WebView, NetInfo } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, FooterTab, Badge, List, ListItem } from 'native-base'

import NavigationService from '@Service/Navigation'

import MESSAGES from './Messages'


import Style from '@Theme/Style'
import Styles from '@Screen/Member/Messages/Style'

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
  constructor(props){
     super(props);
     this.state ={ isLoading: true,
       mapURL : '',
                }
   }


   componentDidMount(){

     return fetch('https://emlakdunyasi.enuox.com/json=iletisim')
       .then((response) => response.json())
       .then((responseJson) => {

         console.log(responseJson);

         this.setState({
           isLoading: false,
           dataSubeler: responseJson.subeler,
           mapURL: responseJson.maps,
           dataSaatler: responseJson.saatler
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
                    <Text style={Style.actionBarText}>{'İLETİSİM'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                </View>
            </Header>


            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.btnLayout}>
                  <WebView
                    style={{height: 225}}
                    source={{uri: this.state.mapURL}}
                  />
                      <FlatList
                          data={this.state.dataSaatler}
                          vertical
                          showsHorizontalScrollIndicator={false}
                          style={Styles.flatList}
                          renderItem={({id,item}) => (

                            <View style={{paddingHorizontal: 8, marginTop: 12.5, marginBottom: 10}}>
                            <Text style={{fontWeight: 'bold',fontSize: 15.2, marginBottom: 5, textAlign: 'center'}}>
                                {item.hafta_ici}
                            </Text>
                            <Text style={{fontWeight: 'bold',fontSize: 15, marginBottom: 5, textAlign: 'center'}}>
                                {item.hafta_sonu}
                            </Text>
                          </View>
                                  )}
                              />


                        <FlatList
                            data={this.state.dataSubeler}
                            vertical
                            showsHorizontalScrollIndicator={false}
                            style={Styles.flatList}
                            renderItem={({id,item}) => (

                              <List style={Styles.infoTab}>
                              <ListItem style={Styles.infoItem}>
                                  <Icon name="map-marker" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                  <View>
                                      <Text style={Styles.infoHeader,{width:'96%'}}>{item.sube}</Text>
                                      <Text style={Styles.infoDesc}>{item.adres}</Text>
                                  </View>
                              </ListItem>
                              <ListItem style={Styles.infoItem}>
                                  <Icon name="phone" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                  <View>
                                      <Text style={Styles.infoHeader,{width:'96%'}}>Telefonlar</Text>
                                      <Text style={Styles.infoDesc}>
                                        {item.telefon1}{'\n'}
                                        {item.telefon2}{'\n'}
                                        {item.telefon3}
                                      </Text>
                                  </View>
                              </ListItem>
                              <ListItem style={Styles.infoItem}>
                                  <Icon name="at" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                  <View>
                                      <Text style={Styles.infoHeader,{width:'96%'}}>Mail Adresi</Text>
                                      <Text style={Styles.infoDesc}>{item.mail}</Text>
                                  </View>
                              </ListItem>
                              <ListItem style={Styles.infoItem}>
                                  <Icon name="facebook" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                  <View>
                                      <Text style={Styles.infoHeader,{width:'96%'}}>Facebook</Text>
                                      <Text style={Styles.infoDesc}>{item.facebook}</Text>
                                  </View>
                              </ListItem>
                              <ListItem style={Styles.infoItem}>
                                  <Icon name="instagram" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                  <View>
                                      <Text style={Styles.infoHeader,{width:'96%'}}>İnstagram</Text>
                                      <Text style={Styles.infoDesc}> @{item.instagram}</Text>
                                  </View>
                              </ListItem>
                            </List>
                                    )}
                                />

                            </View>

                        </Content>


            <Footer style={Style.greyTopLine}>
                <FooterTab style={Style.bgBot}>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('PublicHome')
                    }}>
                        <Icon name="home" type="FontAwesome" style={Style.textBlue} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('PublicPropertySearch')
                    }}>
                        <Icon name="search" type="Octicons" style={Style.textBlue} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberHome')
                    }}>
                        <Icon name="user" type="FontAwesome" style={Style.textBlue} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberFavorites')
                    }}>
                        <Icon name="info-with-circle" type="Entypo" style={Style.textBlue} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberMessages')
                    }}>
                        <Icon name="address-card" type="FontAwesome" style={Style.textBlueActive} />
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    }
}
