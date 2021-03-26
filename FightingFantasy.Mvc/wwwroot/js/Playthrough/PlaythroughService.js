class PlaythroughService {
    selectedParagraph;
    playthrough;
    repository;

    constructor(playthrough, selectedParagraphId) {
        this.playthrough = playthrough;
        this.selectedParagraph = this.getParagraph(selectedParagraphId);
        this.repository = new BackendRepository();
    }

    appendParagraph() {
        // get current last paragraph
        var lastParagraph = this.getLastParagraph();

        // create new paragraph with same items and stats 
        var newParagraph = {
            items: lastParagraph.items,
            stats: new Array(lastParagraph.stats.length),
            description: 'Enter a description',
            number: 0
        };

        for (var i = 0; i < lastParagraph.stats.length; i++) {
            newParagraph.stats[i] = {
                name: lastParagraph.stats[i].name,
                value: lastParagraph.stats[i].value,
                statId: lastParagraph.stats[i].statId
            };
        }
        

        // save it to backend
        try {
            this.repository.appendParagraph(this.playthrough.id, newParagraph);
        } catch (e) {
            alert(`error appending paragraph ${e}`);
            throw(e);
        }

        // append new paragraph to current paragraph
        lastParagraph.toParagraphId = newParagraph.id;
        lastParagraph.toParagraph = newParagraph;

        // update selected paragraph
        this.setSelectedParagraph(newParagraph.id);
    }

    setSelectedParagraph(paragraphId) {
        this.selectedParagraph = this.getParagraph(paragraphId);
        $(this).trigger('paragraphSelected', this.selectedParagraph);
    }

    editItems(items) {
        this.selectedParagraph.items = items;
        this.repository.updateParagraph(this.playthrough.id, this.selectedParagraph);
    }

    editNumber(number) {
        this.selectedParagraph.number = number;
        this.repository.updateParagraph(this.playthrough.id, this.selectedParagraph);
    }

    editDescription(description) {
        this.selectedParagraph.description = description;
        this.repository.updateParagraph(this.playthrough.id, this.selectedParagraph);
    }

    editStat(name, value) {
        for (var i = 0; i < this.selectedParagraph.stats.length; i++) {
            if (this.selectedParagraph.stats[i].name == name) {
                this.selectedParagraph.stats[i].value = value;
                break;
            }
        }
        this.repository.updateParagraph(this.playthrough.id, this.selectedParagraph);
    }

    deleteLastParagraph() {
        var last = this.getLastParagraph();
        var prev = this.getPreviousParagraph(last);

        try {
            this.repository.deleteLastParagraph(this.playthrough.id);
        } catch (e) {
            alert(`delete paragraph failed: ${e}`);
            throw (e);
        }

        prev.toParagraph = undefined;
        prev.toParagraphId = undefined;

        this.setSelectedParagraph(prev.id);
    }

    getParagraph(id) {
        var currParagraph = playthrough.startParagraph;

        while (currParagraph != undefined) {
            if (currParagraph.id == id)
                return currParagraph;
            else
                currParagraph = currParagraph.toParagraph;
        }

        throw `invalid paragraph id ${id}`;
    }

    getLastParagraph() {
        var currParagraph = playthrough.startParagraph;
        while (currParagraph.toParagraph != undefined) {
            currParagraph = currParagraph.toParagraph
        }

        return currParagraph;
    }

    getPreviousParagraph(currParagraph) {
        var prevParagraph = playthrough.startParagraph;

        do {
            if (prevParagraph.toParagraph.id == currParagraph.id)
                return prevParagraph;
            else
                prevParagraph = prevParagraph.toParagraph;
        } while (prevParagraph != undefined);

        throw 'No previous paragraph found';
    }
}