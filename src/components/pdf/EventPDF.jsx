import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const COLORS = {
  primary: "#58644B",
  bg: "#FAFAF7",
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

  frame: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    bottom: 14,
    border: `2px solid ${COLORS.primary}`,
  },

  innerFrame: {
    position: "absolute",
    top: 24,
    left: 24,
    right: 24,
    bottom: 24,
    border: "1px solid #E7E7DF",
  },

  cornerTopLeftH: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 54,
    borderTop: `2px solid ${COLORS.primary}`,
  },

  cornerTopLeftV: {
    position: "absolute",
    top: 14,
    left: 14,
    height: 54,
    borderLeft: `2px solid ${COLORS.primary}`,
  },

  cornerTopRightH: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 54,
    borderTop: `2px solid ${COLORS.primary}`,
  },

  cornerTopRightV: {
    position: "absolute",
    top: 14,
    right: 14,
    height: 54,
    borderRight: `2px solid ${COLORS.primary}`,
  },

  cornerBottomLeftH: {
    position: "absolute",
    bottom: 14,
    left: 14,
    width: 54,
    borderBottom: `2px solid ${COLORS.primary}`,
  },

  cornerBottomLeftV: {
    position: "absolute",
    bottom: 14,
    left: 14,
    height: 54,
    borderLeft: `2px solid ${COLORS.primary}`,
  },

  cornerBottomRightH: {
    position: "absolute",
    bottom: 14,
    right: 14,
    width: 54,
    borderBottom: `2px solid ${COLORS.primary}`,
  },

  cornerBottomRightV: {
    position: "absolute",
    bottom: 14,
    right: 14,
    height: 54,
    borderRight: `2px solid ${COLORS.primary}`,
  },

  imageRow: {
    flexDirection: "row",
    gap: 12,
  },

  imageCard: {
    flex: 1,
    border: `1px solid ${COLORS.border}`,
    padding: 8,
    borderRadius: 6,
  },

  imageLabel: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 6,
    color: COLORS.primary,
  },

  smallImage: {
    width: "100%",
    height: 140,
    objectFit: "contain",
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
        {/* Decorative Border */}
        <View fixed style={styles.frame} />

        {/* Corners */}
        <View fixed style={styles.cornerTopLeftH} />
        <View fixed style={styles.cornerTopLeftV} />

        <View fixed style={styles.cornerTopRightH} />
        <View fixed style={styles.cornerTopRightV} />

        <View fixed style={styles.cornerBottomLeftH} />
        <View fixed style={styles.cornerBottomLeftV} />

        <View fixed style={styles.cornerBottomRightH} />
        <View fixed style={styles.cornerBottomRightV} />
        
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

        {(data.poster || data.generatedCanvasImage) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visual Preview</Text>

          <View style={styles.imageRow}>

            {data.poster && (
              <View style={styles.imageCard}>
                <Text style={styles.imageLabel}>Poster</Text>
                <Image
                  src={safeImage(data.poster)}
                  style={styles.smallImage}
                />
              </View>
            )}

            {data.generatedCanvasImage && (
              <View style={styles.imageCard}>
                <Text style={styles.imageLabel}>Setup</Text>
                <Image
                  src={safeImage(data.generatedCanvasImage)}
                  style={styles.smallImage}
                />
              </View>
            )}

          </View>
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