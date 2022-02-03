import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image, Text, View,
    StatusBar, TouchableOpacity,
    FlatList, RefreshControl
} from 'react-native';
import { userSalaryService } from '../../services/SalaryService/SalaryService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as IMAGE from '../../styles/image';
import * as COLOR from '../../styles/colors';
import styles from './SalaryStyle';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;

const ListTab = [
    {
        'status': languageConfig.salarytext
    },
    {
        'status': languageConfig.paysliptext
    }
]

export default SalaryScreen = (props) => {
    const [status, setStatus] = useState(languageConfig.languageConfig.salarytext);
    const [loading, setLoading] = useState(false);
    const [salaryhistoryList, setSalaryHistoryList] = useState([]);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [basicEarning, setBasicEarning] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [expense, setExpense] = useState(0);
    const [PFtax, setPFTax] = useState(0);
    const [PTtax, setPTTax] = useState(0);
    const [totalCF, setTotalCF] = useState(0);
    var currentYear = moment().format('YYYY');
    var userID;

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        setLoading(true);
        getUserDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading, status, salaryhistoryList, userInfo, currencySymbol,
        refreshing, basicEarning, bonus, expense, PFtax, PTtax, totalCF
    ]);

    const setStatusFilter = (status, index) => {
        const tab = ListTab.map((item) => {
            item.selected = false;
            return item;
        });
        tab[index].selected = true;
        setStatus(status)
    }

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        if (userInfo) {
            userID = userInfo._id;
            const response = getCurrency(userInfo.branchid.currency);
            setBasicEarning(userInfo.salarycomponents && userInfo.salarycomponents[0] && userInfo.salarycomponents[0].amount ? userInfo.salarycomponents[0].amount : 0);
            setBonus(0);
            setExpense(0);
            setPFTax(0);
            setPTTax(userInfo.salarycomponents && userInfo.salarycomponents[1] && userInfo.salarycomponents[1].amount ? userInfo.salarycomponents[1].amount : 0)
            setTotalCF(userInfo.cf ? userInfo.cf : 0);
            setCurrencySymbol(response);
            setUserInfo(userInfo);
            await getSalaryHistoryList();
            wait(1000).then(() => setLoading(false));
        } else {
            wait(1000).then(() => setLoading(false));
        }
    }

    const onRefresh = () => {
        setrefreshing(true);
        getSalaryHistoryList();
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET HISTORY LIST USING API 
    const getSalaryHistoryList = async () => {
        try {
            const response = await userSalaryService(currentYear);
            if (response.data != null && response.data != 'undefind' && response.status == 200 && response.data.length > 0) {
                let filterArray = [];
                response.data.forEach(element => {
                    let nwefilteredLists = element.employeesalary.find(el => el.employeeid._id == userID)
                    if (nwefilteredLists) {
                        nwefilteredLists.month = element.month;
                        nwefilteredLists.paymentdate = element.paymentdate;
                        nwefilteredLists.year = element.year;
                    }
                    filterArray.push(nwefilteredLists);
                })
                const sliceArray = filterArray.slice(0, 6);
                setSalaryHistoryList(sliceArray);
                setLoading(false);
            }
        } catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER SALARY HISTORY LIST USING FLATLIST
    const renderSalaryHistory = ({ item }) => (
        <View style={styles.viewMain}>
            <Text style={styles.earningTextTitle}>{moment().month(item.month - 1).format("MMM") + ' - ' + moment().year(item.year).format("YYYY")}</Text>
            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                <Text style={styles.text}>{languageConfig.paidsalarytext}</Text>
                <Text style={styles.text}>{currencySymbol + item.earnings}</Text>
            </View>
            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                <Text style={styles.text}>{languageConfig.taxamount}</Text>
                <Text style={styles.text}>{currencySymbol + item.statutorydeductions}</Text>
            </View>
            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                <Text style={styles.text}>{languageConfig.bonusamounttext}</Text>
                <Text style={styles.text}>{currencySymbol + item.bonus}</Text>
            </View>
            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                <Text style={styles.text}>{languageConfig.totalsalarytext}</Text>
                <Text style={styles.text}>{currencySymbol + item.netonhand}</Text>
            </View>
            <View style={{ marginBottom: 15 }} />
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={styles.listTab}>
                {
                    ListTab.map((e, index) => (
                        <TouchableOpacity style={[styles.btnTab, status === e.status && styles.tabActive]} onPress={() => setStatusFilter(e.status, index)}>
                            <Text style={[styles.tabText, status === e.status && styles.tabTextActive]}>
                                {e.status}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                {
                    status == languageConfig.paysliptext &&
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={salaryhistoryList}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderSalaryHistory}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        keyExtractor={item => item._id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                title={languageConfig.pullrefreshtext}
                                tintColor={COLOR.DEFALUTCOLOR}
                                titleColor={COLOR.DEFALUTCOLOR}
                                colors={[COLOR.DEFALUTCOLOR]}
                                onRefresh={onRefresh} />
                        }
                        ListFooterComponent={() => (
                            salaryhistoryList && salaryhistoryList.length > 0 ?
                                <></>
                                :
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                </View>
                        )}
                    />
                }

                {status == languageConfig.salarytext &&
                    <>
                        <View style={{ marginTop: 10 }} />
                        <View style={styles.viewMain}>
                            <Text style={styles.earningTextTitle}>{languageConfig.earningstext}</Text>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                                <Text style={styles.text}>{languageConfig.basictext}</Text>
                                <Text style={styles.text}>{currencySymbol + basicEarning}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                                <Text style={styles.text}>{languageConfig.bonustext}</Text>
                                <Text style={styles.text}>{currencySymbol + bonus}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                                <Text style={styles.text}>{languageConfig.expensetext}</Text>
                                <Text style={styles.text}>{currencySymbol + expense}</Text>
                            </View>
                            <View style={{ marginBottom: 15 }} />
                        </View>
                        <View style={styles.viewMain}>
                            <Text style={styles.deductionTextTitle2}>{languageConfig.deductionstext}</Text>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                                <Text style={styles.text}>{languageConfig.providenttext}</Text>
                                <Text style={styles.text}>{currencySymbol + PFtax}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                                <Text style={styles.text}>{languageConfig.professionaltax}</Text>
                                <Text style={styles.text}>{currencySymbol + PTtax}</Text>
                            </View>
                            <View style={{ marginBottom: 15 }} />
                        </View>
                        <View style={styles.viewMain}>
                            <Text style={styles.leaveTextTitle}>{languageConfig.leavestext}</Text>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20 }}>
                                <Text style={styles.text}>{languageConfig.carryforwordtext}</Text>
                                <Text style={styles.text}>{totalCF}</Text>
                            </View>
                            <View style={{ marginBottom: 15 }} />
                        </View>
                    </>
                }
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}


