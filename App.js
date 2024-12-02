import { StatusBar } from "expo-status-bar";
import {
	FlatList,
	ScrollView,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View,
} from "react-native";
import colors from "./constant/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import dataKaomoji from "./kaomoji.json";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as Clipboard from "expo-clipboard";

export default function App() {
	const [selectedItem, setSelectedItem] = useState("emotions");
	const [kaomojiData, setKaomojiData] = useState(dataKaomoji.emotions);

	useEffect(() => {
		if (selectedItem === "emotions") {
			setKaomojiData(dataKaomoji.emotions);
		} else if (selectedItem === "actions") {
			setKaomojiData(dataKaomoji.actions);
		} else if (selectedItem === "animals") {
			setKaomojiData(dataKaomoji.animals);
		} else if (selectedItem === "other") {
			setKaomojiData(dataKaomoji.other);
		} else if (selectedItem === "special") {
			setKaomojiData(dataKaomoji.special);
		} else {
			setKaomojiData(dataKaomoji.emotions); // Default category
		}
	}, [selectedItem]); // Dependency array

	const kaomojiList = kaomojiData
		? Object.entries(kaomojiData).flatMap(([emotionType, kaomojis]) =>
				kaomojis.map((kaomoji) => ({ type: emotionType, kaomoji }))
		  )
		: [];

	const kaomojiTypes = Object.keys(dataKaomoji);

	const copyToClipboard = async (item) => {
		await Clipboard.setStringAsync(item);
		ToastAndroid.show(item + " berhasil di-copy", ToastAndroid.SHORT);
	};

	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: colors.secondary }}
		>
			<ScrollView>
				<View>
					<View
						className="py-6 rounded-b-xl"
						style={{ backgroundColor: colors.primary }}
					>
						<Text className="text-white text-2xl font-bold mx-6 mb-4">
							Kaomoji
						</Text>

						<FlatList
							data={kaomojiTypes}
							keyExtractor={(item) => item}
							contentContainerStyle={{
								paddingHorizontal: 14,
								justifyContent: "space-between",
							}}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item }) => (
								<TouchableOpacity
									className="p-3 m-2 rounded-md shadow-lg items-center"
									onPress={() => {
										setSelectedItem(item);
									}}
									style={{
										backgroundColor:
											selectedItem === item ? colors.white : colors.secondary,
										minHeight: 24,
									}}
								>
									<Text
										className="text-md"
										style={{
											color: selectedItem === item ? colors.primary : "white",
											lineHeight: 14,
										}}
									>
										{item}
									</Text>
								</TouchableOpacity>
							)}
							horizontal
						/>
					</View>

					<FlatList
						data={kaomojiList}
						className="mb-8"
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => `${item.kaomoji}-${index}`}
						renderItem={({ item }) => (
							<View
								className="py-4 px-6 mx-4 my-2 rounded-md shadow-md"
								style={{
									backgroundColor: colors.primary,
									flexDirection: "row",
								}}
							>
								<Text className="flex-1 text-white text-lg font-bold">
									{item.kaomoji}
								</Text>
								<TouchableOpacity
									onPress={() => copyToClipboard(item.kaomoji)}
									className="mr-2 ml-4"
								>
									<Icon name="copy" size={30} color={colors.white} />
								</TouchableOpacity>
							</View>
						)}
					/>
				</View>
			</ScrollView>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}
