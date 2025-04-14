const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/filter', (req, res) => {
    const {triplets, ner, tfidf} = req.body;
    
    const missingFields = [];
    if (!triplets) missingFields.push('triplets');
    if (!ner) missingFields.push('ner');
    if (!tfidf) missingFields.push('tfidf');

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const tfidfMap = new Map(tfidf);
    const filteredTriplets = triplets.filter(([subject, relation, object]) => {
        const matchedNER = ner.some(
            entity =>
                subject.includes(entity) || object.includes(entity)
        );
        const matchedTFIDF = [subject, relation, object].some(word => {
            const freq = tfidfMap.get(word);
            return freq && freq > 0.5
        });

        return matchedNER || matchedTFIDF;
    });

    res.status(200).json({ filteredTriplets })
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});