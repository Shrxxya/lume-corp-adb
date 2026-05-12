import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const COLORS = {
  primary: "#62754c",
  bg: "#Fdfdf8",
  dark: "#14182a",
  border: "#e5e5e5",
};

const safeImage = (img) => {
  if (!img) return null;
  if (img.startsWith("data:image")) return img;
  return `data:image/png;base64,${img}`;
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    backgroundColor: COLORS.bg,
    fontSize: 11,
    color: COLORS.dark,
  },

  header: {
    marginBottom: 20,
    borderBottom: `1px solid ${COLORS.border}`,
    paddingBottom: 12,
  },

  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 60,
    height: 60,
  },

  company: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 700,
  },

  title: {
    fontSize: 22,
    marginTop: 10,
    fontWeight: 700,
  },

  subtitle: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 2,
  },

  section: {
    marginTop: 18,
    padding: 14,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 8,
    color: COLORS.primary,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  chip: {
    padding: 6,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },

  chipText: {
    fontSize: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  timelineItem: {
    marginBottom: 4,
  },

  bold: {
    fontWeight: 700,
  },

  total: {
    marginTop: 8,
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: 6,
    fontWeight: 700,
  },

  poster: {
    width: "100%",
    maxHeight: 400,
    objectFit: "contain",
    marginTop: 10,
  },
});

export default function EventPDF({ data, quotation, decorImage }) {
  const formattedDate = new Date(data.date).toLocaleDateString(
  "en-IN",
  {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/nobg_logo2.png`}
              style={styles.logo}
            />
            {/* <Text style={styles.company}>Lume Corp</Text> */}
          </View>

          <Text style={styles.title}>{data.eventName}</Text>
          <Text style={styles.subtitle}>
            {formattedDate} • {data.location}
          </Text>
        </View>

        {/* EVENT DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Overview</Text>
          <Text>Guests: {data.guestCount}</Text>
          <Text>Budget: ₹{data.budget}L</Text>
        </View>

        {/* BUDGET */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Allocation</Text>
          {data.budgetBreakdown.map((b, i) => (
            <View key={i} style={styles.row}>
              <Text>{b.category}</Text>
              <Text>{b.amount}%</Text>
            </View>
          ))}
        </View>

        {/* VENDORS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Vendors</Text>
          {data.vendors.map((v, i) => (
            <Text key={i}>
              {v.name} — {v.category}
            </Text>
          ))}
        </View>

        {/* MENU */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <View style={styles.grid}>
            {data.menu.map((dish, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>
                  {dish.name} ({dish.cuisine})
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* TIMELINE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Timeline</Text>
          {data.timeline.map((t, i) => (
            <Text key={i} style={styles.timelineItem}>
              {t.time} — {t.title}
            </Text>
          ))}
        </View>

        {/* EVENT POSTER */}
        {data.poster && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Poster</Text>
            <Image
              src={safeImage(data.poster)}
              style={styles.poster}
            />
          </View>
        )}

        {/*CANVAS GENERATED IMAGE */}
        {data.generatedCanvasImage && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Final Day Setup</Text>
            <Image
              src={safeImage(data.generatedCanvasImage)}
              style={styles.poster}
            />
          </View>
        )}

        {/* QUOTATION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Investment</Text>

          <View style={styles.row}>
            <Text>Service Fee</Text>
            <Text>₹{quotation.serviceFee}L</Text>
          </View>

          <View style={styles.row}>
            <Text>GST</Text>
            <Text>₹{quotation.gst}L</Text>
          </View>

          <View style={styles.total}>
            <Text>Total: ₹{quotation.total}L</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}