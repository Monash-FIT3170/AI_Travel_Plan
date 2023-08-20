import React, { useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
	page: {
		padding: 20,
	},
	table: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	card: {
		border: "1pt solid #000",
		padding: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 14,
		fontWeight: "bold",
	},
	description: {
		fontSize: 12,
	},
});

const data = [
	{ title: "Card 1", description: "Description for Card 1" },
	{ title: "Card 2", description: "Description for Card 2" },
	// TODO: Change to dynamic data
];

// Create Document Component
const Itinerarypdf = ({ travelItinerary, setItinerary }) => (
	// Filling document with cards
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.table}>
				{data.map((item, index) => (
					<View key={index} style={styles.card}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.description}>{item.description}</Text>
					</View>
				))}
			</View>
		</Page>
	</Document>
);

export function exportPDF() {
	ReactPDF.render(<Itinerarypdf />, `${__dirname}/itinerary.pdf`);
}