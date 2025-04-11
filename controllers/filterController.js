exports.filterTriplets = (req, res) => {
    const {triplets, ner, tfidf} = req.body;
    if (!triplets || !ner || !tfidf) {
        return res.status(400).send('Missing required fields');
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
};