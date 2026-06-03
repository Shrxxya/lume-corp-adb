import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 700,
  },
  section: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: "#666",
  },
  value: {
    fontWeight: 600,
  },
  total: {
    marginTop: 20,
    paddingTop: 12,
    borderTop: "1 solid #ddd",
    fontSize: 18,
    fontWeight: 700,
  },
});

export default function ReceiptPDF({
  bookingId,
  paymentDate,
  amount,
  leadData,
  eventName,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Payment Receipt</Text>

        <View style={styles.section}>
          <Text>
            Thank you for booking your event with us.
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Booking ID</Text>
          <Text style={styles.value}>{bookingId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Event</Text>
          <Text style={styles.value}>{eventName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Customer</Text>
          <Text style={styles.value}>{leadData?.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{leadData?.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{leadData?.phone}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment Date</Text>
          <Text style={styles.value}>{paymentDate}</Text>
        </View>

        <View style={styles.total}>
          <Text>Advance Paid: {amount}</Text>
        </View>
      </Page>
    </Document>
  );
}