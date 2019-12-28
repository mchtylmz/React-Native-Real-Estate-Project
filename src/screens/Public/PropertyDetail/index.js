import React from 'react'
import { StatusBar, WebView, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ActivityIndicator, Modal } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge, List, ListItem, Tab, Tabs } from 'native-base'
import Carousel from 'react-native-snap-carousel';
import NavigationService from '@Service/Navigation'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/PropertyDetail/Style'


//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
  constructor(props){
     super(props);
     this.state ={ isLoading: true,
                }
   }

   componentDidMount(){
     const emlakID = this.props.navigation.getParam('emlakID', '0');

     return fetch('https://emlakdunyasi.enuox.com/json=detay/detay='+emlakID)
       .then((response) => response.json())
       .then((responseJson) => {

         console.log(responseJson);
         this.setState({
           isLoading: false,
           dataSourceDetay: responseJson.detay
         }, function(){

         });

       })
       .catch((error) =>{
         console.error(error);
       });
   }

   _Gallery ({item, index}) {
       return (
           <View >
              <Image source={{ uri: item.img }} style={Styles.sliderImg} />
           </View>
       );
   }

    render() {

        return <Container style={Style.bgMain}>
            <StatusBar backgroundColor="rgba(0,0,0,0)" animated barStyle="dark-content" />

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
              <View>
                <FlatList
                  data={this.state.dataSourceDetay}
                  vertical
                  showsHorizontalScrollIndicator={false}
                  style={Styles.flatList}
                  renderItem={({id,item}) => (
                    <View>
                <ImageBackground source={{ uri: item.resim }} imageStyle={'cover'} style={Styles.coverImg}>
                    <View style={Style.actionBarIn}>
                        <Button transparent style={Style.actionBarBtn} onPress={() => {
                            this.props.navigation.navigate('PublicHome')
                        }}>
                            <Icon active name='arrow-left' style={Style.textBlack} type="MaterialCommunityIcons" />
                        </Button>
                    </View>
                </ImageBackground>

                <View style={Styles.section}>
                  <Text style={Styles.price}>{htmlEscape(item.baslik)}</Text>
                    <Text style={Styles.price}>{htmlEscape(item._fiyat)}</Text>
                    <View style={Styles.locationTop}>
                        <Icon active name='map-marker-radius' style={Styles.locationTopIcon} type="MaterialCommunityIcons" />
                        <Text style={Styles.locationTopInfo}>{htmlEscape(item.tipi)}</Text>
                    </View>
                </View>

                <View style={Styles.count}>
                    <View style={[Styles.countItem, Styles.countFirst]}>
                        <View style={Styles.countCol}>
                            <Icon name="bed" type="FontAwesome" style={Styles.countIcon} />
                            <View>
                                <Text style={Styles.countNo}>{item._oda}</Text>
                                <Text style={Styles.countText}>Oda</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.countItem}>
                        <View style={Styles.countCol}>
                            <Icon name="bathtub" type="FontAwesome" style={Styles.countIcon} />
                            <View>
                                <Text style={Styles.countNo}>{item._banyo}</Text>
                                <Text style={Styles.countText}>Banyo</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.countItem}>
                        <View style={Styles.countCol}>
                            <Icon name="expand" type="FontAwesome" style={Styles.countIcon} />
                            <View>
                                <Text style={Styles.countNo}>{item._alan}</Text>
                                <Text style={Styles.countText}>Alanı</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <ImageBackground source={require('@Asset/images/shadow.png')} imageStyle={'cover'} style={Styles.shadow} />

                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>Açıklama</Text>
                    <Text style={Styles.overviewDesc}>{htmlEscape(item.aciklama)}</Text>
                </View>

                <View style={Styles.gallery}>
                    <Text style={Styles.galleryTitle}>Fotoğraf Galerisi</Text>

                    <View style={Styles.galleryImg}>
                        <Carousel
                          layout={'stack'}
                          layoutCardOffset={`18`}
                          data={item.galeri}
                          renderItem={this._Gallery}
                          sliderWidth={440}
                          itemWidth={360}
                      />

                    </View>
                </View>

                <View style={Styles.amenities}>
                    <Text style={Styles.amenityTitle}>Genel Bilgiler</Text>
                      <View style={Styles.amenity}>
                        <Text style={Styles.amenityItem}>{item.tipi}</Text>
                        <Text style={Styles.amenityItem}>{item.turu}</Text>
                        <Text style={Styles.amenityItem}>{item.oda}</Text>
                        <Text style={Styles.amenityItem}>{item.banyo}</Text>
                        <Text style={Styles.amenityItem}>{item.alan}</Text>
                        <Text style={Styles.amenityItem}>{item.garaj}</Text>
                        <Text style={Styles.amenityItem}>{item.esya}</Text>
                        <Text style={Styles.amenityItem}>{item.tapu}</Text>
                        <Text style={Styles.amenityItem}>{item.fiyat}</Text>
                        <Text style={Styles.amenityItem}>{item.fiyatTL}</Text>
                      </View>
                </View>
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
function htmlEscape(str){
    return str.replace("&#39;","'").replace("&#39;","'").replace("&#39;","'").replace("&#39;","'")
    .replace("&#214;","Ö").replace("&#214;","Ö").replace("&#214;","Ö").replace("&#214;","Ö")
    .replace("&#220;","Ü").replace("&#220;","Ü").replace("&#220;","Ü").replace("&#220;","Ü")
    .replace("&#199;","Ç").replace("&#199;","Ç").replace("&#199;","Ç").replace("&#199;","Ç")
    .replace("&#246;","ö").replace("&#246;","ö").replace("&#246;","ö").replace("&#246;","ö")
    .replace("&#252;","ü").replace("&#252;","ü").replace("&#252;","ü").replace("&#252;","ü")
    .replace("&#231;","ç").replace("&#231;","ç").replace("&#231;","ç").replace("&#231;","ç")
    .replace("&Uuml;","Ü").replace("&Uuml;","Ü").replace("&Uuml;","Ü").replace("&Uuml;","Ü")
    .replace("&Ouml;","Ö").replace("&Ouml;","Ö").replace("&Ouml;","Ö").replace("&Ouml;","Ö")
    .replace("&Uuml;","Ü").replace("&Uuml;","Ü").replace("&Uuml;","Ü").replace("&Uuml;","Ü")
    .replace("&Ouml;","Ö").replace("&Ouml;","Ö").replace("&Ouml;","Ö").replace("&Ouml;","Ö")
    .replace("&Ccedil;","Ç").replace("&Ccedil;","Ç").replace("&Ccedil;","Ç").replace("&Ccedil;","Ç")
    .replace("<p>"," ").replace("<p>"," ").replace("<p>"," ").replace("<p>"," ").replace("<p>"," ")
    .replace("<p>"," ").replace("<p>"," ").replace("<p>"," ").replace("<p>"," ").replace("<p>"," ")
    .replace("</p>"," ").replace("</p>"," ").replace("</p>"," ").replace("</p>"," ").replace("</p>"," ")
    .replace("<p>"," ").replace("<p>"," ").replace("<p>"," ").replace("<p>"," ").replace("<p>"," ")
    .replace("</p>"," ").replace("</p>"," ").replace("</p>"," ").replace("</p>"," ").replace("</p>"," ")
    .replace("</p>"," ").replace("</p>"," ").replace("</p>"," ").replace("</p>"," ").replace("</p>"," ")
    .replace("</li>"," ").replace("</li>"," ").replace("</li>"," ").replace("</li>"," ").replace("</li>"," ")
    .replace("<li>"," ").replace("<li>"," ").replace("<li>"," ").replace("<li>"," ").replace("<li>"," ")
    .replace("<ul>"," ").replace("<ul>"," ").replace("<ul>"," ").replace("<ul>"," ").replace("<ul>"," ")
    .replace("</ul>"," ").replace("</ul>"," ").replace("</ul>"," ").replace("</ul>"," ").replace("</ul>"," ")
    .replace("</ul>"," ")
    .replace("</li>"," ").replace("</li>"," ").replace("</li>"," ").replace("</li>"," ").replace("</li>"," ")
    .replace("<li>"," ").replace("<li>"," ").replace("<li>"," ").replace("<li>"," ").replace("<li>"," ")
    .replace("<ul>"," ").replace("<ul>"," ").replace("<ul>"," ").replace("<ul>"," ").replace("<ul>"," ")
    .replace("</ul>"," ").replace("</ul>"," ").replace("</ul>"," ").replace("</ul>"," ").replace("</ul>"," ")
    .replace("</ul>"," ")
}

// <FlatList
//     data={item.galeri}
//     horizontal
//     style={Styles.slider}
//     showsHorizontalScrollIndicator={false}
//     renderItem={({ item, separators }) => (
//         <TouchableOpacity underlayColor='transparent' onPress={() => { this.props.navigation.navigate('') }}>
//             <View>
//               <Image source={{ uri: item.img }} style={Styles.sliderImg} />
//             </View>
//         </TouchableOpacity>
//     )}
//       />
