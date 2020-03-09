const router = require("express").Router(),
    service = require('../service/borrowerService.js');

// Checkout book
router.post('/loans', async (req, res) => {
    try {
        await service.checkoutBook(req.body.borrowerId, req.body.branchId, req.body.bookId);
        res.status(201).send();
    } catch (err) {
        if (err.code == "#E258")
            res.status(409).send(err.message);
        else if (err.code == "#E784")
            res.status(404).send(err.message);
        else if (err.code == "#E356")
            res.status(400).send(err.message);
        //default error is server error
        else
            res.status(500).send(err.message);
    }
});

// Return book
router.put('/loans', async (req, res) => {
    try {
        await service.returnBook(req.body.loanId);
        res.status(204).send();
    } catch (err) {
        if (err.code == "#E258")
            res.status(409).send(err.message);
        else if (err.code == "#E784")
            res.status(404).send(err.message);
        else if (err.code == "#E356")
            res.status(400).send(err.message);
        //default error is server error
        else
            res.status(500).send(err.message);
    }
});

// Read all borrowers
router.get('/borrowers', async (req, resp) => {
    try {
        let borrowers = await service.findBorrowers();
        resp.status(200).send(borrowers);
    } catch (err) {
        if (err.code == "#E784")
            resp.status(404).send(err.message);
        else
            resp.status(500).send(err.message);
    }
});

// Read all loans for a specific borrower
router.get('/borrowers/:id/loans', async (req, resp) => {
    try {
        let loans = await service.findLoans(req.params.id);
        resp.status(200).send(loans);
    } catch (err) {
        if (err.code == "#E356")
            resp.status(400).send(err.message);
        else if (err.code == "#E784")
            resp.status(404).send(err.message);
        else
            resp.status(500).send(err.message);
    }
});

// Read all branches
router.get('/branches', async (req, resp) => {
    try {
        let branches = await service.findBranches();
        resp.status(200).send(branches);
    } catch (err) {
        if (err.code == "#E784")
            resp.status(404).send(err.message);
        else
            resp.status(500).send(err.message);
    }
});

// Read all book copies in a specific branch
router.get('/branches/:id/copies', async (req, resp) => {
    try {
        let copies = await service.findCopiesByBranch(req.params.id);
        resp.status(200).send(copies);
    } catch (err) {
        if (err.code == "#E356")
            resp.status(400).send(err.message);
        else if (err.code == "#E784")
            resp.status(404).send(err.message);
        else
            resp.status(500).send(err.message);
    }
});

module.exports = router;
