class BackendRepository {

    deleteLastParagraph(playthoughId) {
        $.ajax(`/Playthrough/DeleteLastParagraph?playthroughId=${playthoughId}`, {
            dataType: "html",
            contentType: 'application/x-www-form-urlencoded',
            method: 'POST',
            async: false,
            error: function (xhr, status, error) {
                alert(`deleteParagraph failed: ${status}, ${error}`);
            }
        });
    }

    appendParagraph(playthroughId, newParagraph) {
        // save it to backend
        var jsonStr = JSON.stringify(newParagraph);
        var newId;

        $.ajax(`/Playthrough/AppendParagraph?playthroughId=${playthroughId}`, {
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: jsonStr,
            method: 'POST',
            success: function (data) {
                newId = data;
            },
            async: false,
            error: function (xhr, status, error) {
                alert(`createParagraph failed: ${status}, ${error}`);
            }
        });

        // update its id
        newParagraph.id = newId;

        return newParagraph;
    }

    updateParagraph(playthroughId, paragraph) {
        var jsonStr = JSON.stringify(paragraph);

        $.ajax(`/Playthrough/UpdateParagraph?playthroughId=${playthroughId}`, {
            dataType: "html",
            data: jsonStr,
            contentType: 'application/json',
            method: 'POST',
            async: false,
            error: function (xhr, status, error) {
                alert(`updateParagraph failed: ${status}, ${error}`);
            }
        });
    }
}