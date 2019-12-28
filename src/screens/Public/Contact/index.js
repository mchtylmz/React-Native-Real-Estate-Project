import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge, List, ListItem } from 'native-base'

import NavigationService from '@Service/Navigation'

import Style from '@Theme/Style'
import Styles from '@Screen/Public/Contact/Style'


//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
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
                    <Text style={Style.actionBarText}>{'Contact Us'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                </View>
            </Header>


            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground source={require('@Asset/images/property-bg.png')} imageStyle={'cover'} style={Styles.page}>
                    <View style={Styles.pageCol}>
                        <Image source={require('@Asset/images/contact.png')} style={Styles.pageIcon} />
                    </View>
                </ImageBackground>
                <View>
                    <List style={Styles.infoTab}>
                        <ListItem style={Styles.infoItem}>
                            <Icon name="map-marker-radius" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                            <View>
                                <Text style={Styles.infoHeader}>{'Address'.toUpperCase()}</Text>
                                <Text style={Styles.infoDesc}>3-277-10, Susan Apartment, {"\n"}Liverpool, United Kingdoom</Text>
                            </View>
                        </ListItem>
                        <ListItem style={Styles.infoItem}>
                            <Icon name="phone" type="FontAwesome" style={Styles.infoIcon} />
                            <View>
                                <Text style={Styles.infoHeader}>{'Phone'.toUpperCase()}</Text>
                                <Text style={Styles.infoDesc}>+01 1234567982 / +01 9874658231</Text>
                            </View>
                        </ListItem>
                        <ListItem style={Styles.infoItem}>
                            <Icon name="mail" type="Entypo" style={Styles.infoIcon} />
                            <View>
                                <Text style={Styles.infoHeader}>{'Email'.toUpperCase()}</Text>
                                <Text style={Styles.infoDesc}>info@myyaowrealtor.com</Text>
                            </View>
                        </ListItem>
                        <ListItem style={[Styles.infoItem, Styles.infoItemLast]}>
                            <Icon name="web" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                            <View>
                                <Text style={Styles.infoHeader}>{'Website'.toUpperCase()}</Text>
                                <Text style={Styles.infoDesc}>www.myyaowrealtor.com</Text>
                            </View>
                        </ListItem>
                    </List>
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
                        <Icon name="user" type="FontAwesome" style={Style.textActive} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberFavorites')
                    }}>
                        <Icon name="heart" type="FontAwesome" style={Style.textBlue} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberMessages')
                    }}>
                        <Icon name="bell" type="Entypo" style={Style.textBlue} />
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    }
}
