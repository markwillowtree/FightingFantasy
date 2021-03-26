class BackendRepository {

    deleteLastParagraph(playthoughId) {
        var success = false;

        $.ajax(`/Playthrough/DeleteLastParagraph?playthroughId=${playthoughId}`, {
            dataType: "html",
            contentType: 'application/x-www-form-urlencoded',
            method: 'POST',
            async: false,
            success: function () { success = true;}
        });

        return success;
    }

    appendParagraph(playthroughId, newParagraph) {
        var success = false;

        // save it to backend
        var jsonStr = JSON.stringify(newParagraph);
        var newId;

        var returnedParagraph;
        $.ajax(`/Playthrough/AppendParagraph?playthroughId=${playthroughId}`, {
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: jsonStr,
            method: 'POST',
            success: function (paragraph) {
                returnedParagraph = paragraph;
                success = true; 
            },
            async: false,
        });

        return success ? returnedParagraph : undefined;
    }

    updateParagraph(playthroughId, paragraph) {
        var success = false;

        var jsonStr = JSON.stringify(paragraph);

        $.ajax(`/Playthrough/UpdateParagraph?playthroughId=${playthroughId}`, {
            dataType: "html",
            data: jsonStr,
            contentType: 'application/json',
            method: 'POST',
            async: false,
            success: function () { success = true; }
        });

        return success;
    }
}