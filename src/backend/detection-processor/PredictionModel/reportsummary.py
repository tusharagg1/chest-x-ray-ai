def genreport(preds):

    priority = max(preds, key=preds.get)

    low, mod, hi, neg = [], [], [], []
    report = ""
    for disease in preds:
        if preds[disease] > 0.75:
            hi.append(disease)
        elif preds[disease] > 0.4:
            mod.append(disease)
        elif preds[disease] > 0.05:
            low.append(disease)
        else:
            neg.append(disease)

    report += f"Highest priority: further investigation of {
        priority} recommended.\n\n"
    if len(hi) > 0:
        hiS = ", ".join(hi)
        report += f"High risk of {hiS} was found\n"
    if len(mod) > 0:
        modS = ", ".join(mod)
        report += f"Moderate risk of {modS} was found\n"
    if len(low) > 0:
        lowS = ", ".join(low)
        report += f"Low risk of {lowS} was found\n"

    if len(hi + mod + low) == 0:
        report += (
            "A significant risk was not found for any of the considered "
            "diseases\n"
        )
    if len(neg) > 0:
        neg = ", ".join(neg)
        report += f"Negligible risk of {neg}.\n"

    return report


"""
SAMPLE REPORT TEMPLATE
Highest priority: further investigation of <> recommended.
#disease with highest value

High risk of Q,W,E was found #value > 0.75
Moderate risk of Q,W,E was found #value > 0.4
Low risk of Q,W,E was found #value > 0.05
A significant risk was not found for any of the diseases #if above 3 are empty
Negligible risk of Q,W,E #value <= 0.05
"""
