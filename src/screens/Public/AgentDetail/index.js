import React from 'react'
import { StatusBar, WebView, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge, List, ListItem, Tab, Tabs } from 'native-base'

import NavigationService from '@Service/Navigation'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/AgentDetail/Style'


//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
  constructor(props){
     super(props);
     this.state ={ isLoading: true,
                }
   }

   componentDidMount(){
     const kisiID = this.props.navigation.getParam('kisiID', '0');
     return fetch('https://emlakdunyasi.enuox.com/json=kadroDetay/id='+parseInt(kisiID))
       .then((response) => response.json())
       .then((responseJson) => {

         this.setState({
           isLoading: false,
           dataSourceKadromuz: responseJson.data,
         }, function(){

         });

       })
       .catch((error) =>{
         console.error(error);
       });
   }

    render() {
        return <Container style={Style.bgMain}>
            <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
            <View>
              <FlatList
                      data={this.state.dataSourceKadromuz}
                      style={Styles.flatList}
                      vertical
                      renderItem={({id,item}) => (
                <View style={Styles.profile}>

                  <ImageBackground source={{ uri: item.arkaplan }} imageStyle={'center'} style={Styles.coverImg}>
                  </ImageBackground>

                    <View style={Styles.bgBlue}>
                    </View>

                    <View style={Styles.owner}>
                        <Image source={{ uri: item.resim }} style={Styles.ownerAvatarImg} />
                        <View style={Styles.ownerInfo}>
                            <Text style={Styles.ownerName}>{item.adi}</Text>
                            <Text style={Styles.ownerLocation}>{item.isi}</Text>
                        </View>
                    </View>

                    <View style={[Styles.back, Style.actionBarIn]}>
                        <Button transparent style={Style.actionBarBtn} onPress={() => {
                            this.props.navigation.navigate('MemberHome')
                        }}>
                            <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                        </Button>
                    </View>
                </View>
              )}
            />
              </View>


                <List style={Styles.infoTab}>
                  <ListItem style={Styles.infoItem}>
                      <Icon name="facebook" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                      <View>
                          <Text style={Styles.infoHeader}>{'Facebook'.toUpperCase()}</Text>
                          <Text style={Styles.infoDesc}>facebook.com/KibrisEmlakDunyasi</Text>
                      </View>
                  </ListItem>
                  <FlatList
                          data={this.state.dataSourceKadromuz}
                          style={Styles.flatList}
                          vertical
                          renderItem={({id,item}) => (
                            <View>

                    <ListItem style={Styles.infoItem}>
                        <Icon name="phone" type="FontAwesome" style={Styles.infoIcon} />
                        <View>
                            <Text style={Styles.infoHeader}>{'Telefon'.toUpperCase()}</Text>
                            <Text style={Styles.infoDesc}>{item.tel}</Text>
                        </View>
                    </ListItem>
                    <ListItem style={Styles.infoItem}>
                        <Icon name="mail" type="Entypo" style={Styles.infoIcon} />
                        <View>
                            <Text style={Styles.infoHeader}>{'Email'.toUpperCase()}</Text>
                            <Text style={Styles.infoDesc}>{item.mail}</Text>
                        </View>
                    </ListItem>

                    </View>
                  )}
                />
                <ListItem style={[Styles.infoItem, Styles.infoItemLast]}>
                    <Icon name="web" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                    <View>
                        <Text style={Styles.infoHeader}>{'Website'.toUpperCase()}</Text>
                        <Text style={Styles.infoDesc}>www.kibrisemlakdunyasi.com</Text>
                    </View>
                </ListItem>
                </List>

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
                        <Icon name="user" type="FontAwesome" style={Style.textActive} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberFavorites')
                    }}>
                        <Icon name="info-with-circle" type="Entypo" style={Style.textBlue} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberMessages')
                    }}>
                        <Icon name="address-card" type="FontAwesome" style={Style.textBlue} />
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    }
}
