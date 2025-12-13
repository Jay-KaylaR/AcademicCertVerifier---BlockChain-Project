// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string studentName;
        string courseName;
        string institution;
        uint256 issuedOn;
        bool isValid;
    }

    address public admin;
    mapping(string => Cert) private certificates;

    event CertificateIssued(string indexed certId, string studentName);
    event CertificateRevoked(string indexed certId);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    function issueCertificate(
        string memory certId,
        string memory studentName,
        string memory courseName,
        string memory institution
    ) public onlyAdmin {
        require(bytes(certId).length > 0, "Invalid id");
        certificates[certId] = Cert(
            studentName,
            courseName,
            institution,
            block.timestamp,
            true
        );
        emit CertificateIssued(certId, studentName);
    }

    function revokeCertificate(string memory certId) public onlyAdmin {
        require(certificates[certId].issuedOn != 0, "Not found");
        certificates[certId].isValid = false;
        emit CertificateRevoked(certId);
    }

    function verifyCertificate(string memory certId)
        public
        view
        returns (string memory studentName, string memory courseName, string memory institution, uint256 issuedOn, bool isValid)
    {
        Cert memory c = certificates[certId];
        return (c.studentName, c.courseName, c.institution, c.issuedOn, c.isValid);
    }
}
