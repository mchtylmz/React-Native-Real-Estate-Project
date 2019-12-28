 import React from 'react'
import { StatusBar, TouchableOpacity, TouchableHighlight, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, View, FlatList, WebView, NetInfo } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, FooterTab, Badge } from 'native-base'

import NavigationService from '@Service/Navigation'

import PROPERTIES from './Properties'


import Style from '@Theme/Style'
import Styles from '@Screen/Member/Favorites/Style'

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {

  constructor(props){
     super(props);
     this.state ={ isLoading: true,

                }
   }


   componentDidMount(){

     return fetch('https://emlakdunyasi.enuox.com/json=hakkimizda')
       .then((response) => response.json())
       .then((responseJson) => {

         console.log(responseJson);

         this.setState({
           isLoading: false,
           dataSourceHak: responseJson.hakkimizda,
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
            <Text style={Style.actionBarTextHak}>{'Hakkımızda'.toUpperCase()}</Text>
        </View>
        <View style={Style.actionBarRight}>
        </View>
    </Header>

    <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

        <View style={Styles.btnLayout}>

              <FlatList
                  data={this.state.dataSourceHak}
                  vertical
                  showsHorizontalScrollIndicator={false}
                  style={Styles.flatList}
                  renderItem={({id,item}) => (
                    <View>
                    <Text style={{padding:10, fontWeight: 'bold',marginBottom: 5, textAlign:'center',backgroundColor:'#f1f4c7'}}>
                        {item.baslik}
                    </Text>
                    <Text style={{marginBottom: 7.5, lineHeight: 22.5, paddingHorizontal: 12, paddingTop: 8}}>
                          {item.icerik}
                    </Text>
                    </View>
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
                        <Icon name="info-with-circle" type="Entypo" style={Style.textBlueActive} />
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
