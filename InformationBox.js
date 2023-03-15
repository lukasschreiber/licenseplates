import RenderHtml from 'react-native-render-html';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { VictoryPie, VictoryTooltip } from 'victory-native';
import { useEffect, useState } from 'react';
import Svg, { Circle, Image } from 'react-native-svg';

export default function InformationBox(props) {
    const { width } = useWindowDimensions();
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        setIsCollapsed(true);
    }, [props]);

    return (
        <View key={props.data.derived} style={styles.container}>
            <RenderHtml source={{ html: `<span style="font-size: 20px; max-width: ${width * 0.9}px;text-align:center;">${props.data.districts.map(d => d.displayText).join(", ")}</span>` }} contentWidth={width / 2} />
            <View style={styles.sub}>
                <Text style={styles.title}>abgeleitet von: </Text><RenderHtml source={{ html: `<span style="color: rgba(0,0,0,0.6); max-width: ${width * 0.6}px; ">${props.data.derived}</span>` }} contentWidth={width - 300} />
            </View>
            <View style={styles.sub}>
                <Text style={styles.title}>Bundesland: </Text><RenderHtml source={{ html: `<span style="color: rgba(0,0,0,0.6)">${props.data.state}</span>` }} contentWidth={width} />
            </View>
            {props.data.districts.some(d => d.statistics !== null) ?
                <View style={styles.container}>
                    <Text onPress={() => setIsCollapsed(!isCollapsed)} style={styles.more}>
                        {isCollapsed ? "Zeige mehr": "Zeige weniger"}
                    </Text>
                    {!isCollapsed && <View style={styles.container}>
                        <View style={styles.stat}>
                            <Text>Das Kennzeichen <Text style={styles.license}>{props.data.code}</Text> wird in {props.data.districts.filter(d => d.statistics !== null).length === 1 ? `nur einem Zulassungsbezirk` : `${props.data.districts.filter(d => d.statistics !== null).length} Zulassungsbezirken`} vergeben.
                                {props.data.new ? " Es handelt sich um ein liberalisiertes Kennzeichen." : ""}
                            </Text>
                        </View>
                        {props.data.districts.map(district => district.statistics && <View style={styles.stat}>
                            <Text style={styles.heading}>Zulassungsbezirk {district.name}</Text>
                            <Text style={{ alignSelf: "flex-start" }}>Im Zulassungsbezirk {district.name} sind <Text style={styles.bold}>{district.statistics.total}</Text> Kraftfahrzeuge zugelassen, davon haben <Text style={styles.bold}>{district.statistics.alternate}</Text> einen alternativen Antrieb.</Text>
                            <View style={styles.tabletRow}>
                                <Svg width={300} height={250}>
                                    <Image x="50%" y="50%" transform="translate(-20, -20)" width={40} height={40} preserveAspectRatio="xMidYMid slice" href={require("./assets/liquid-drop.png")} />
                                    <VictoryPie
                                        radius={80}
                                        innerRadius={50}
                                        height={250}
                                        width={300}
                                        colorScale={["#32323A", "#18A465"]}
                                        data={[
                                            { label: "Benzin/Diesel", x: (district.statistics.total - district.statistics.alternate), y: (district.statistics.total - district.statistics.alternate) / district.statistics.total },
                                            { label: "Alternativ", x: district.statistics.alternate, y: district.statistics.alternate / district.statistics.total },
                                        ]}
                                    />
                                </Svg>
                                <Svg width={300} height={250}>
                                    <Image x="50%" y="50%" transform="translate(-17, -17)" width={34} height={34} preserveAspectRatio="xMidYMid slice" href={require("./assets/leaf.png")} />
                                    <VictoryPie
                                        radius={80}
                                        innerRadius={50}
                                        height={250}
                                        width={300}
                                        colorScale={["#016C3B", "#048943", "#18A465", "#58C694"]}
                                        data={[
                                            { label: "Hybrid", x: district.statistics.hybrid, y: district.statistics.hybrid / district.statistics.total },
                                            { label: "Elektrisch", x: district.statistics.electric, y: district.statistics.electric / district.statistics.total },
                                            { label: "Plug-in", x: district.statistics.plugin, y: district.statistics.plugin / district.statistics.total },
                                            { label: "Gas", x: district.statistics.gas, y: district.statistics.gas / district.statistics.total },
                                        ]}
                                    />
                                </Svg>
                            </View>
                            <View style={styles.density}>
                                <Text style={styles.title}>Autodichte: </Text><Text style={styles.densityNo}>{district.statistics.density} </Text><Text style={styles.densityInfo}>pro 1000 Einwohner</Text>
                            </View>
                            <Text style={styles.info}>Die Daten stammen aus einem Auszug des zentralen Fahrzeugregister (ZFZR) des Kraftfahrt-Bundesamtes (KBA). Da ein Zulassungsbezirk mehrere Kennzeichen herausgeben kann sind diese auch in der Statistik enthalten. In diesem Falle sind das folgende Kennzeichen: <Text style={styles.license}>{[...district.alternatives, props.data.code].join(", ")}</Text>.</Text>
                        </View>)}
                    </View>}
                </View> : ""}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        position: "relative",
        backgroundColor: "white"
    },
    license: {
        fontFamily: "EuroPlate",
        fontSize: 16
    },
    sub: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5
    },
    title: {
        color: "rgba(0,0,0,.4)"
    },
    info: {
        color: "rgba(0,0,0,.4)",
        fontSize: 12,
        marginTop: 20,
    },
    bold: {
        fontWeight: "bold",
    },
    heading: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "flex-start"
    },
    stat: {
        elevation: 10,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 10,
        marginBottom: 40,
        width: "90%",
        borderRadius: 10,
        backgroundColor: "white",
    },
    tabletRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    more: {
        padding: 5,
        color: "rgba(0,0,0,.6)",
        borderColor: "rgba(0,0,0,.6)",
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 5,
    },
    density: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
    },
    densityNo: {
        fontWeight: "bold",
    },
    densityInfo: {
        color: "rgba(0,0,0,.4)",
        fontSize: 12,
    },
});