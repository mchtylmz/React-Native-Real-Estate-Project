import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native'
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
                }
   }

   componentDidMount(){
     const baslik = this.props.navigation.getParam('baslik', '0');
     const tipi = this.props.navigation.getParam('tipi', '0');
     const min = this.props.navigation.getParam('min', '0');
     const max = this.props.navigation.getParam('max', '0');
     const oda = this.props.navigation.getParam('oda', '0');
     const banyo = this.props.navigation.getParam('banyo', '0');
     const sehir = this.props.navigation.getParam('sehir', '0');
     const bolge = this.props.navigation.getParam('bolge', '0');

     var istek = '?durum='+tipi+'&';
     if (baslik != '') { istek += 'baslik='+baslik+'&' }
     if (min != 'Min') { istek += 'min='+min+'&' }
     if (max != 'Max') { istek += 'max='+max+'&' }
     if (oda != 'Tumu') { istek += 'oda='+oda+'&' }
     if (banyo != 'Tumu') { istek += 'banyo='+banyo+'&' }
     if (sehir != 'Tumu') { istek += 'sehir='+sehir+'&' }
     if (bolge != 'Tumu') { istek += 'bolge='+bolge }

     return fetch('https://emlakdunyasi.enuox.com/json=ara'+istek)
       .then((response) => response.json())
       .then((responseJson) => {

         if (responseJson.count < 1) {
           Alert.alert(
            'Bulunamadı!..',
            'Aramaya uygun emlak bulunamadı!..',
            [
              {
                text: 'Geri Dön',
                onPress: () => this.props.navigation.navigate('PublicPropertySearch'),
                style: 'cancel',
              },
              {text: 'Anasayfa', onPress: () => this.props.navigation.navigate('PublicHome')},
            ],
            {cancelable: false},
          );
         }

         this.setState({
           isLoading: false,
           dataSourceSonuc: responseJson.sonuc
         }, function(){

         });

       })
       .catch((error) =>{
         console.error(error);
       });
   }
    render() {

      if(this.state.isLoading){
             return(
               <Container style={Style.bgMain}>
                 <Header style={Style.navigation}>
                     <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

                     <View style={Style.actionBarLeft}>
                         <Button transparent style={Style.actionBarBtn} onPress={() => {
                             this.props.navigation.navigate('PublicPropertySearch')
                         }}>
                             <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                         </Button>
                     </View>
                     <View style={Style.actionBarMiddle}>
                         <Text style={Style.actionBarText}>ARAMA SONUCU</Text>
                     </View>
                     <View style={Style.actionBarRight}></View>
                 </Header>

               <View style={{flex: 1, justifyContent:"center"}}>
                 <ActivityIndicator/>
               </View>
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
             )
           }
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        this.props.navigation.navigate('PublicPropertySearch')
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>ARAMA SONUCU</Text>
                </View>
                <View style={Style.actionBarRight}></View>
            </Header>


            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.section}>
                  <FlatList
                      data={this.state.dataSourceSonuc}
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
