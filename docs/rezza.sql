-- phpMyAdmin SQL Dump
-- version 3.5.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 27, 2013 at 03:10 PM
-- Server version: 5.5.29
-- PHP Version: 5.3.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `itmg`
--

-- --------------------------------------------------------

--
-- Table structure for table `CONTENTS`
--

CREATE TABLE IF NOT EXISTS `CONTENTS` (
  `CONTENT_ID` int(19) NOT NULL AUTO_INCREMENT,
  `XTYPE` varchar(100) NOT NULL,
  `ID` varchar(100) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CONTENT_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `CONTENTS`
--

INSERT INTO `CONTENTS` (`CONTENT_ID`, `XTYPE`, `ID`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 'gridpanel', 'investors-list-investor-grid', '2013-02-12 12:24:55', '2013-02-13 09:50:01'),
(2, 'gridpanel', 'investors-list-investortype-grid', '2013-02-13 16:49:41', '2013-02-13 09:49:41'),
(3, 'gridpanel', 'locations-list-gridpanel', '2013-02-13 17:04:34', '2013-02-13 10:04:34'),
(4, 'gridpanel', 'shareholdings-list', '2013-02-18 12:06:33', '2013-02-18 05:06:33'),
(5, 'gridpanel', 'shareprices-list-shareprices-grid', '2013-02-22 13:52:57', '2013-02-23 08:00:08'),
(6, 'gridpanel', 'sharepricesname-list-gridpanel', '2013-02-23 14:30:34', '2013-02-23 08:00:21');

-- --------------------------------------------------------

--
-- Table structure for table `CONTENT_COLUMNS`
--

CREATE TABLE IF NOT EXISTS `CONTENT_COLUMNS` (
  `CONTENT_COLUMN_ID` int(19) NOT NULL AUTO_INCREMENT,
  `CONTENT_ID` int(19) NOT NULL,
  `TEXT` varchar(100) NOT NULL,
  `DATAINDEX` varchar(100) NOT NULL,
  `DATATYPE` varchar(100) NOT NULL,
  `ALIGN` varchar(20) NOT NULL DEFAULT 'left',
  `WIDTH` int(5) NOT NULL DEFAULT '100',
  `EDITABLE` int(1) NOT NULL DEFAULT '0',
  `FLEX` int(1) NOT NULL DEFAULT '0',
  `INDEX` int(5) NOT NULL DEFAULT '0',
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CONTENT_COLUMN_ID`),
  KEY `CONTENT_ID` (`CONTENT_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=58 ;

--
-- Dumping data for table `CONTENT_COLUMNS`
--

INSERT INTO `CONTENT_COLUMNS` (`CONTENT_COLUMN_ID`, `CONTENT_ID`, `TEXT`, `DATAINDEX`, `DATATYPE`, `ALIGN`, `WIDTH`, `EDITABLE`, `FLEX`, `INDEX`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 1, 'Company Name', 'COMPANY_NAME', 'string', 'left', 250, 1, 1, 0, '2013-02-12 12:43:12', '2013-02-13 09:18:38'),
(2, 1, 'Style', 'STYLE', 'string', 'center', 100, 1, 0, 10, '2013-02-13 15:36:16', '2013-02-13 09:20:06'),
(3, 1, 'Investor Type', 'INVESTOR_TYPE', 'combobox', 'left', 200, 1, 0, 20, '2013-02-13 15:39:26', '2013-02-13 09:20:18'),
(4, 1, 'Equity Assets', 'EQUITY_ASSETS', 'int', 'center', 100, 1, 0, 30, '2013-02-13 15:45:12', '2013-02-13 09:20:25'),
(5, 1, 'Office Location', 'LOCATION', 'combobox', 'center', 150, 0, 0, 50, '2013-02-13 15:50:08', '2013-02-14 10:43:07'),
(6, 1, 'Last Update', 'MODIFIED_DATE', 'string', 'center', 200, 0, 0, 60, '2013-02-13 15:50:33', '2013-02-13 08:50:33'),
(7, 2, 'Investor Type', 'INVESTOR_TYPE', 'string', 'left', 150, 1, 1, 0, '2013-02-13 16:54:13', '2013-02-13 10:01:04'),
(8, 2, 'Created Date', 'CREATED_DATE', 'string', 'center', 150, 0, 0, 10, '2013-02-13 16:54:45', '2013-02-13 09:54:45'),
(9, 2, 'Last Update', 'MODIFIED_DATE', 'string', 'center', 150, 0, 0, 20, '2013-02-13 16:55:13', '2013-02-13 09:55:13'),
(10, 3, 'Location', 'LOCATION', 'string', 'left', 200, 1, 1, 0, '2013-02-13 17:07:03', '2013-02-14 10:43:00'),
(11, 3, 'Created Date', 'CREATED_DATE', 'string', 'center', 150, 0, 0, 10, '2013-02-13 17:07:24', '2013-02-13 10:07:39'),
(12, 3, 'Last Update', 'MODIFIED_DATE', 'string', 'center', 150, 0, 0, 20, '2013-02-13 17:08:01', '2013-02-13 10:08:01'),
(13, 4, 'Investor Name', 'INVESTOR_NAME', 'string', 'left', 170, 1, 1, 0, '2013-02-18 12:07:02', '2013-02-18 05:07:02'),
(14, 4, 'Investor Status', 'INVESTOR_STATUS', 'string', 'left', 170, 1, 0, 10, '2013-02-18 12:07:38', '2013-02-18 05:07:38'),
(15, 4, 'Account Holder', 'ACCOUNT_HOLDER', 'string', 'left', 250, 1, 0, 20, '2013-02-18 12:08:04', '2013-02-18 05:50:16'),
(16, 4, 'Total', 'AMOUNT', 'int', 'center', 100, 1, 0, 30, '2013-02-18 12:08:44', '2013-02-18 05:08:56'),
(17, 4, 'Percentage (%)', 'PERCENTAGE', 'float', 'center', 100, 0, 0, 40, '2013-02-18 12:09:30', '2013-02-18 06:16:17'),
(18, 5, 'Date', 'DATE', 'string', 'center', 100, 0, 0, 0, '2013-02-22 14:10:29', '2013-02-23 08:35:55'),
(34, 6, 'Name', 'SHAREPRICES_NAME', 'string', 'left', 100, 1, 0, 0, '2013-02-25 17:39:45', '2013-02-25 10:45:07'),
(35, 6, 'Created Date', 'CREATED_DATE', 'string', 'left', 150, 0, 0, 10, '2013-02-25 17:45:52', '2013-02-25 10:46:45'),
(36, 6, 'Modified Date', 'MODIFIED_DATE', 'string', 'left', 150, 0, 0, 20, '2013-02-25 17:46:14', '2013-02-25 10:46:50'),
(41, 5, 'JKSE', 'JKSE', 'float', 'center', 100, 1, 1, 0, '2013-02-25 20:20:42', '2013-02-25 14:00:22'),
(42, 5, 'ITMG', 'ITMG', 'float', 'center', 100, 1, 1, 0, '2013-02-25 20:21:00', '2013-02-25 14:00:16'),
(43, 5, 'PTBA', 'PTBA', 'float', 'center', 100, 1, 1, 0, '2013-02-25 20:21:31', '2013-02-25 14:08:12');

-- --------------------------------------------------------

--
-- Table structure for table `CONTENT_TBARS`
--

CREATE TABLE IF NOT EXISTS `CONTENT_TBARS` (
  `CONTENT_TBAR_ID` int(19) NOT NULL AUTO_INCREMENT,
  `CONTENT_ID` int(19) NOT NULL,
  `XTYPE` varchar(30) NOT NULL,
  `ID` varchar(100) NOT NULL,
  `TEXT` varchar(100) NOT NULL,
  `ICONCLS` varchar(100) NOT NULL,
  `INDEX` int(5) NOT NULL DEFAULT '0',
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CONTENT_TBAR_ID`),
  KEY `CONTENT_ID` (`CONTENT_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `CONTENT_TBARS`
--

INSERT INTO `CONTENT_TBARS` (`CONTENT_TBAR_ID`, `CONTENT_ID`, `XTYPE`, `ID`, `TEXT`, `ICONCLS`, `INDEX`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 1, 'button', 'investors-add-new-investor-button', 'Add New Investor', 'icon-go', 0, '2013-02-13 16:04:16', '2013-02-17 09:57:41'),
(2, 2, 'button', 'investortype-add', 'Add Investor Type', 'icon-go', 0, '2013-02-13 16:56:30', '2013-02-17 09:34:07'),
(3, 3, 'button', 'locations-add', 'Add New Location', 'icon-go', 0, '2013-02-13 17:08:29', '2013-02-17 09:34:53'),
(4, 1, 'button', 'investors-search', 'Search', 'icon-search', 20, '2013-02-13 19:13:32', '2013-02-17 10:04:46'),
(5, 1, 'button', 'investors-detail-investor', 'Detail Investor', 'icon-detail', 10, '2013-02-17 14:09:39', '2013-02-17 10:06:25'),
(6, 2, 'button', 'investortype-delete', 'Delete', 'icon-stop', 10, '2013-02-17 16:26:36', '2013-02-17 09:26:36'),
(7, 3, 'button', 'locations-delete', 'Delete', 'icon-stop', 10, '2013-02-17 16:35:27', '2013-02-17 09:35:27'),
(8, 4, 'button', 'shareholdings-add-btn', 'Add New Shareholding', 'icon-go', 0, '2013-02-18 12:16:10', '2013-02-18 05:16:10'),
(9, 4, 'button', 'shareholdings-delete-btn', 'Delete', 'icon-stop', 10, '2013-02-18 12:51:25', '2013-02-18 05:51:40'),
(10, 4, 'button', 'shareholdings-upload', 'Upload Excel', 'icon-attachment', 20, '2013-02-18 13:04:34', '2013-02-18 06:11:12'),
(11, 4, 'button', 'shareholdings-search-btn', 'Search', 'icon-search', 30, '2013-02-18 13:12:29', '2013-02-18 06:12:29'),
(12, 5, 'button', 'shareprices-add-btn', 'Add New Shareprices', 'icon-go', 0, '2013-02-18 12:16:10', '2013-02-22 07:02:26'),
(13, 5, 'button', 'shareprices-delete-btn', 'Delete', 'icon-stop', 10, '2013-02-18 12:51:25', '2013-02-22 07:05:27'),
(14, 5, 'button', 'shareprices-detail-shareprices', 'Detail Shareprices', 'icon-detail', 20, '2013-02-17 14:09:39', '2013-02-22 07:05:31'),
(15, 5, 'button', 'shareprices-upload', 'Upload Excel', 'icon-attachment', 30, '2013-02-18 13:04:34', '2013-02-22 07:05:34'),
(16, 5, 'button', 'shareprices-search-btn', 'Search', 'icon-search', 40, '2013-02-18 13:12:29', '2013-02-22 07:05:57'),
(17, 6, 'button', 'sharepricesname-add-btn', 'Add Shareprices Name', 'icon-go', 0, '2013-02-18 12:16:10', '2013-02-22 07:02:26'),
(18, 6, 'button', 'sharepricesname-delete-btn', 'Delete', 'icon-stop', 10, '2013-02-18 12:51:25', '2013-02-22 07:05:27');

-- --------------------------------------------------------

--
-- Table structure for table `CONTENT_TBAR_LISTENERS`
--

CREATE TABLE IF NOT EXISTS `CONTENT_TBAR_LISTENERS` (
  `CONTENT_TBAR_LISTENER_ID` int(19) NOT NULL AUTO_INCREMENT,
  `CONTENT_TBAR_ID` int(19) NOT NULL,
  `PATH` varchar(255) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CONTENT_TBAR_LISTENER_ID`),
  KEY `CONTENT_TBAR_ID` (`CONTENT_TBAR_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `CONTENT_TBAR_LISTENERS`
--

INSERT INTO `CONTENT_TBAR_LISTENERS` (`CONTENT_TBAR_LISTENER_ID`, `CONTENT_TBAR_ID`, `PATH`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 1, '/request/tbar/investors/add.js', '2013-02-13 23:56:54', '2013-02-13 16:56:54'),
(2, 4, '/request/tbar/investors/search.js', '2013-02-14 15:18:46', '2013-02-14 08:18:46'),
(3, 2, '/request/tbar/investortype/add.js', '2013-02-17 14:52:16', '2013-02-17 07:52:16'),
(4, 3, '/request/tbar/locations/add.js', '2013-02-17 16:21:59', '2013-02-17 09:21:59'),
(5, 5, '/request/tbar/investors/detail.js', '2013-02-17 17:08:00', '2013-02-17 10:08:00'),
(6, 6, '/request/tbar/investortype/delete.js', '2013-02-17 14:52:16', '2013-02-20 10:22:25'),
(7, 17, '/request/tbar/sharepricesname/add.js', '2013-02-23 15:03:59', '2013-02-23 08:03:59'),
(8, 18, '/request/tbar/sharepricesname/delete.js', '2013-02-23 15:05:25', '2013-02-23 08:05:25'),
(9, 12, '/request/tbar/shareprices/add.js', '2013-02-23 15:05:25', '2013-02-23 08:05:25');

-- --------------------------------------------------------

--
-- Table structure for table `INVESTORS`
--

CREATE TABLE IF NOT EXISTS `INVESTORS` (
  `INVESTOR_ID` int(19) NOT NULL AUTO_INCREMENT,
  `INVESTOR_TYPE_ID` int(19) NOT NULL,
  `LOCATION_ID` int(19) NOT NULL,
  `COMPANY_NAME` varchar(100) NOT NULL,
  `STYLE` varchar(100) NOT NULL,
  `EQUITY_ASSETS` double NOT NULL,
  `PHONE_1` varchar(30) DEFAULT NULL,
  `PHONE_2` varchar(30) DEFAULT NULL,
  `FAX` varchar(30) DEFAULT NULL,
  `EMAIL_1` varchar(100) DEFAULT NULL,
  `EMAIL_2` varchar(100) DEFAULT NULL,
  `WEBSITE` varchar(100) DEFAULT NULL,
  `ADDRESS` text,
  `COMPANY_OVERVIEW` text,
  `INVESTMENT_STRATEGY` text,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`INVESTOR_ID`),
  KEY `INVESTOR_TYPE_ID` (`INVESTOR_TYPE_ID`),
  KEY `LOCATION_ID` (`LOCATION_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `INVESTORS`
--

INSERT INTO `INVESTORS` (`INVESTOR_ID`, `INVESTOR_TYPE_ID`, `LOCATION_ID`, `COMPANY_NAME`, `STYLE`, `EQUITY_ASSETS`, `PHONE_1`, `PHONE_2`, `FAX`, `EMAIL_1`, `EMAIL_2`, `WEBSITE`, `ADDRESS`, `COMPANY_OVERVIEW`, `INVESTMENT_STRATEGY`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 1, 1, 'Treasury Asia Asset Management Ltd.', 'GARP', 27, '+612 9270 0300', '+612 9270 0310', '+612 9270 0320', NULL, NULL, NULL, 'Level 23, Alfreed Street\r\nSydney 2000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at justo vel tellus varius aliquam ut fermentum enim. In sapien nisl, placerat quis commodo id, tincidunt et velit. Aliquam turpis magna, iaculis ac aliquet dapibus, consectetur nec urna. Nam eu libero non nunc porta pellentesque. Maecenas consectetur consectetur mi sit amet sagittis. Proin pulvinar sagittis lacus sed malesuada. Morbi non magna ultricies lectus feugiat tincidunt rhoncus sed metus. Nulla ac nisl est. Vivamus dapibus arcu eget arcu sollicitudin lacinia vitae ac eros. Nam vel lorem id nulla ultrices feugiat. Aenean et turpis pulvinar metus porttitor interdum. Sed purus velit, viverra in molestie et, pretium eget nulla. Suspendisse auctor facilisis purus, eget rhoncus justo vestibulum quis. Morbi ac arcu dui, quis vestibulum libero. Suspendisse aliquet, lacus vel rutrum consequat, orci enim sollicitudin lacus, sit amet rutrum enim nisi sit amet ligula. Suspendisse leo mauris, porttitor id tristique at, egestas ac neque.\r\n\r\n Nullam lorem purus, volutpat in ultricies id, ultrices iaculis nunc. Cras nisi eros, sagittis non dapibus vitae, molestie sed purus. Etiam pharetra risus sed felis elementum porttitor. Phasellus eleifend luctus justo sit amet scelerisque. Phasellus porttitor euismod molestie. Praesent eu orci mauris, ac accumsan justo. Vivamus sagittis augue in quam tincidunt id congue quam dignissim. Donec porttitor lectus vel nisl pharetra non fringilla nisl euismod. Vestibulum vitae odio at est fermentum hendrerit id nec mi. Integer euismod enim sed massa blandit porta. Aliquam dui mi, luctus a tristique sed, semper eu augue. Aliquam orci quam, mattis vitae porta ut, sodales eu est.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at justo vel tellus varius aliquam ut fermentum enim. In sapien nisl, placerat quis commodo id, tincidunt et velit. Aliquam turpis magna, iaculis ac aliquet dapibus, consectetur nec urna. Nam eu libero non nunc porta pellentesque. Maecenas consectetur consectetur mi sit amet sagittis. Proin pulvinar sagittis lacus sed malesuada. Morbi non magna ultricies lectus feugiat tincidunt rhoncus sed metus. Nulla ac nisl est. Vivamus dapibus arcu eget arcu sollicitudin lacinia vitae ac eros. Nam vel lorem id nulla ultrices feugiat. Aenean et turpis pulvinar metus porttitor interdum. Sed purus velit, viverra in molestie et, pretium eget nulla. Suspendisse auctor facilisis purus, eget rhoncus justo vestibulum quis. Morbi ac arcu dui, quis vestibulum libero. Suspendisse aliquet, lacus vel rutrum consequat, orci enim sollicitudin lacus, sit amet rutrum enim nisi sit amet ligula. Suspendisse leo mauris, porttitor id tristique at, egestas ac neque.', '2013-02-11 14:55:57', '2013-02-17 11:40:46');

-- --------------------------------------------------------

--
-- Table structure for table `INVESTOR_TYPE`
--

CREATE TABLE IF NOT EXISTS `INVESTOR_TYPE` (
  `INVESTOR_TYPE_ID` int(19) NOT NULL AUTO_INCREMENT,
  `INVESTOR_TYPE` varchar(100) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`INVESTOR_TYPE_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `INVESTOR_TYPE`
--

INSERT INTO `INVESTOR_TYPE` (`INVESTOR_TYPE_ID`, `INVESTOR_TYPE`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 'Investment Advisor', '2013-02-11 14:55:06', '2013-02-11 07:55:06'),
(2, 'Investment Advisor 3', '2013-02-14 17:45:07', '2013-02-20 10:15:12'),
(3, 'asdasd', '2013-02-23 15:16:39', '2013-02-23 08:16:39');

-- --------------------------------------------------------

--
-- Table structure for table `LOCATIONS`
--

CREATE TABLE IF NOT EXISTS `LOCATIONS` (
  `LOCATION_ID` int(19) NOT NULL AUTO_INCREMENT,
  `LOCATION` varchar(100) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`LOCATION_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `LOCATIONS`
--

INSERT INTO `LOCATIONS` (`LOCATION_ID`, `LOCATION`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 'Australia', '2013-02-11 14:55:13', '2013-02-11 07:55:13'),
(2, 'China', '2013-02-11 14:55:18', '2013-02-11 07:55:18'),
(3, 'Singapore', '2013-02-11 14:55:24', '2013-02-11 07:55:24'),
(4, 'UK', '2013-02-11 14:55:29', '2013-02-11 07:55:29'),
(5, 'US', '2013-02-11 14:55:34', '2013-02-11 07:55:34'),
(6, 'Australia', '2013-02-21 00:40:04', '2013-02-20 17:40:04'),
(7, 'asfd', '2013-02-21 11:37:57', '2013-02-21 04:37:57');

-- --------------------------------------------------------

--
-- Table structure for table `MODELS`
--

CREATE TABLE IF NOT EXISTS `MODELS` (
  `MODEL_ID` int(19) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) NOT NULL,
  `IDPROPERTY` varchar(100) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`MODEL_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `MODELS`
--

INSERT INTO `MODELS` (`MODEL_ID`, `NAME`, `IDPROPERTY`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 'Investor', 'INVESTOR_ID', '2013-02-11 14:50:56', '2013-02-11 07:50:56'),
(2, 'InvestorType', 'INVESTOR_TYPE_ID', '2013-02-11 18:03:52', '2013-02-11 11:03:52'),
(3, 'Location', 'LOCATION_ID', '2013-02-11 18:04:12', '2013-02-11 11:04:12'),
(4, 'Shareholding', 'SHAREHOLDING_ID', '2013-02-18 11:59:26', '2013-02-18 04:59:26'),
(5, 'Shareprice', 'DATE', '2013-02-22 13:54:07', '2013-02-26 06:28:38'),
(6, 'SharepricesName', 'SHAREPRICES_NAME_ID', '2013-02-23 14:37:37', '2013-02-23 07:37:37');

-- --------------------------------------------------------

--
-- Table structure for table `MODEL_FIELDS`
--

CREATE TABLE IF NOT EXISTS `MODEL_FIELDS` (
  `MODEL_FIELD_ID` int(19) NOT NULL AUTO_INCREMENT,
  `MODEL_ID` int(19) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `TYPE` varchar(100) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`MODEL_FIELD_ID`),
  KEY `MODEL_ID` (`MODEL_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=58 ;

--
-- Dumping data for table `MODEL_FIELDS`
--

INSERT INTO `MODEL_FIELDS` (`MODEL_FIELD_ID`, `MODEL_ID`, `NAME`, `TYPE`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 1, 'INVESTOR_TYPE', 'string', '2013-02-11 14:56:44', '2013-02-11 07:56:44'),
(2, 1, 'LOCATION', 'string', '2013-02-11 14:56:51', '2013-02-11 07:56:59'),
(3, 1, 'INVESTOR_ID', 'int', '2013-02-11 14:57:12', '2013-02-11 07:57:12'),
(4, 1, 'STYLE', 'string', '2013-02-11 14:57:23', '2013-02-11 07:57:31'),
(5, 1, 'EQUITY_ASSETS', 'float', '2013-02-11 14:57:55', '2013-02-11 07:57:55'),
(6, 1, 'PHONE_1', 'string', '2013-02-11 14:58:12', '2013-02-11 07:58:12'),
(7, 1, 'PHONE_2', 'string', '2013-02-11 14:58:24', '2013-02-11 07:58:24'),
(8, 1, 'FAX', 'string', '2013-02-11 14:58:41', '2013-02-11 07:58:41'),
(9, 1, 'EMAIL_1', 'string', '2013-02-11 14:58:55', '2013-02-11 07:58:55'),
(10, 1, 'EMAIL_2', 'string', '2013-02-11 14:59:04', '2013-02-11 07:59:04'),
(11, 1, 'WEBSITE', 'string', '2013-02-11 14:59:18', '2013-02-11 07:59:18'),
(12, 1, 'ADDRESS', 'string', '2013-02-11 14:59:27', '2013-02-11 07:59:27'),
(13, 1, 'COMPANY_OVERVIEW', 'string', '2013-02-11 14:59:45', '2013-02-11 07:59:45'),
(14, 1, 'COMPANY_NAME', 'string', '2013-02-11 14:59:55', '2013-02-11 07:59:55'),
(15, 1, 'INVESTMENT_STRATEGY', 'string', '2013-02-11 15:00:12', '2013-02-11 08:00:12'),
(16, 1, 'CREATED_DATE', 'string', '2013-02-11 15:00:24', '2013-02-11 08:00:24'),
(17, 1, 'MODIFIED_DATE', 'string', '2013-02-11 15:00:34', '2013-02-11 08:00:34'),
(18, 2, 'INVESTOR_TYPE_ID', 'int', '2013-02-13 16:33:24', '2013-02-13 10:01:24'),
(19, 2, 'INVESTOR_TYPE', 'string', '2013-02-13 16:40:54', '2013-02-13 10:01:32'),
(20, 2, 'CREATED_DATE', 'string', '2013-02-13 16:41:15', '2013-02-13 09:41:15'),
(21, 2, 'MODIFIED_DATE', 'string', '2013-02-13 16:41:15', '2013-02-13 09:41:15'),
(22, 3, 'LOCATION', 'string', '2013-02-13 17:06:23', '2013-02-13 10:06:23'),
(23, 3, 'CREATED_DATE', 'string', '2013-02-13 17:06:38', '2013-02-13 10:06:38'),
(24, 3, 'MODIFIED_DATE', 'string', '2013-02-13 17:06:39', '2013-02-13 10:06:39'),
(25, 4, 'SHAREHOLDING_ID', 'int', '2013-02-18 12:03:55', '2013-02-18 05:03:55'),
(26, 4, 'INVESTOR_NAME', 'string', '2013-02-18 12:05:13', '2013-02-18 05:05:13'),
(27, 4, 'INVESTOR_STATUS', 'string', '2013-02-18 12:05:13', '2013-02-18 05:05:13'),
(28, 4, 'ACCOUNT_HOLDER', 'string', '2013-02-18 12:05:13', '2013-02-18 05:05:13'),
(29, 4, 'AMOUNT', 'float', '2013-02-18 12:05:13', '2013-02-18 05:05:13'),
(30, 4, 'CREATED_DATE', 'string', '2013-02-18 12:05:13', '2013-02-18 05:05:13'),
(31, 4, 'MODIFIED_DATE', 'string', '2013-02-18 12:05:14', '2013-02-18 05:05:14'),
(32, 4, 'PERCENTAGE', 'float', '2013-02-18 12:05:14', '2013-02-18 05:05:14'),
(34, 5, 'DATE', 'string', '2013-02-01 00:00:00', '2013-02-23 08:32:24'),
(37, 6, 'SHAREPRICES_NAME_ID', 'int', '2013-02-23 14:48:16', '2013-02-23 08:46:19'),
(38, 6, 'SHAREPRICES_NAME', 'string', '2013-02-23 14:38:45', '2013-02-23 08:46:13'),
(39, 6, 'CREATED_DATE', 'string', '2013-02-23 15:13:21', '2013-02-23 08:46:10'),
(40, 6, 'MODIFIED_DATE', 'string', '2013-02-23 15:13:21', '2013-02-23 08:46:07'),
(41, 5, 'JKSE', 'float', '2013-02-25 20:20:42', '2013-02-25 13:58:55'),
(42, 5, 'ITMG', 'float', '2013-02-25 20:21:00', '2013-02-25 13:58:59'),
(43, 5, 'PTBA', 'float', '2013-02-25 20:21:31', '2013-02-27 07:19:45');

-- --------------------------------------------------------

--
-- Table structure for table `SHAREHOLDINGS`
--

CREATE TABLE IF NOT EXISTS `SHAREHOLDINGS` (
  `SHAREHOLDING_ID` int(19) NOT NULL AUTO_INCREMENT,
  `INVESTOR_NAME` varchar(100) NOT NULL,
  `INVESTOR_STATUS` varchar(100) NOT NULL,
  `ACCOUNT_HOLDER` varchar(100) NOT NULL,
  `AMOUNT` double NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SHAREHOLDING_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `SHAREHOLDINGS`
--

INSERT INTO `SHAREHOLDINGS` (`SHAREHOLDING_ID`, `INVESTOR_NAME`, `INVESTOR_STATUS`, `ACCOUNT_HOLDER`, `AMOUNT`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, 'AAA BALANCED FUND II', 'MUTUAL FUND', 'BANK MANDIRI, PT - CUSTODY', 270000, '2013-02-18 12:47:57', '2013-02-18 05:47:57'),
(2, 'ABN AMRO NOMINEES SINGAPORE PTE LTD', 'INSTITUTION - FOREIGN', 'The Hongkong And Shanghai Banking Corporation Limited', 20000, '2013-02-18 12:48:32', '2013-02-18 05:48:32'),
(3, 'AJB BUMIPUTRA', 'INSURANCE NPWP', 'SAMUEL SEKURITAS, PT', 210000, '2013-02-18 12:48:59', '2013-02-18 05:48:59'),
(4, 'ALLIANZ-SAVING PLAN (NESTLE)-BAHANA', 'PERUSAHAAN TERBATAS NPWP', 'CITIBANK, N.A', 5000, '2013-02-18 13:17:55', '2013-02-18 06:17:55');

-- --------------------------------------------------------

--
-- Table structure for table `SHAREPRICES`
--

CREATE TABLE IF NOT EXISTS `SHAREPRICES` (
  `SHAREPRICES_ID` int(19) NOT NULL AUTO_INCREMENT,
  `DATE` date NOT NULL,
  `SHAREPRICES_NAME` varchar(100) NOT NULL,
  `VALUE` varchar(100) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SHAREPRICES_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `SHAREPRICES`
--

INSERT INTO `SHAREPRICES` (`SHAREPRICES_ID`, `DATE`, `SHAREPRICES_NAME`, `VALUE`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, '2013-02-05', 'JKSE', '1111', '2013-02-27 14:04:53', '2013-02-27 07:04:53'),
(2, '2013-02-05', 'ITMG', '2222', '2013-02-27 14:05:08', '2013-02-27 07:05:08'),
(3, '2013-02-05', 'PTBA', '3333', '2013-02-27 14:05:17', '2013-02-27 07:05:17'),
(4, '2013-02-05', 'JKSE', '4444', '2013-02-27 14:06:34', '2013-02-27 07:06:34');

-- --------------------------------------------------------

--
-- Table structure for table `SHAREPRICES_NAME`
--

CREATE TABLE IF NOT EXISTS `SHAREPRICES_NAME` (
  `SHAREPRICES_NAME_ID` int(19) NOT NULL AUTO_INCREMENT,
  `SHAREPRICES_NAME` varchar(100) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `MODIFIED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SHAREPRICES_NAME_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=58 ;

--
-- Dumping data for table `SHAREPRICES_NAME`
--

INSERT INTO `SHAREPRICES_NAME` (`SHAREPRICES_NAME_ID`, `SHAREPRICES_NAME`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(41, 'JKSE', '2013-02-25 20:20:42', '2013-02-25 14:02:37'),
(42, 'ITMG', '2013-02-25 20:21:00', '2013-02-25 14:02:41'),
(43, 'PTBA', '2013-02-25 20:21:31', '2013-02-27 07:19:44');

-- --------------------------------------------------------

--
-- Table structure for table `STORES`
--

CREATE TABLE IF NOT EXISTS `STORES` (
  `STORE_ID` int(19) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) NOT NULL,
  `PROXY_TYPE` varchar(100) NOT NULL,
  `PROXY_API_READ` varchar(255) NOT NULL,
  `PROXY_API_CREATE` varchar(255) NOT NULL,
  `PROXY_API_UPDATE` varchar(255) NOT NULL,
  `PROXY_API_DESTROY` varchar(255) NOT NULL,
  `PROXY_READER_IDPROPERTY` varchar(100) NOT NULL,
  `PROXY_READER_TYPE` varchar(100) NOT NULL,
  `PROXY_READER_ROOT` varchar(100) NOT NULL,
  `PROXY_READER_TOTALPROPERTY` varchar(100) NOT NULL,
  `PROXY_WRITER_TYPE` varchar(100) NOT NULL,
  `PROXY_WRITER_WRITEALLFIELDS` tinyint(1) NOT NULL DEFAULT '0',
  `PROXY_WRITER_ROOT` varchar(100) NOT NULL,
  `SORTERS_PROPERTY` varchar(100) NOT NULL,
  `SORTERS_DIRECTION` varchar(10) NOT NULL DEFAULT 'ASC',
  PRIMARY KEY (`STORE_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `STORES`
--

INSERT INTO `STORES` (`STORE_ID`, `NAME`, `PROXY_TYPE`, `PROXY_API_READ`, `PROXY_API_CREATE`, `PROXY_API_UPDATE`, `PROXY_API_DESTROY`, `PROXY_READER_IDPROPERTY`, `PROXY_READER_TYPE`, `PROXY_READER_ROOT`, `PROXY_READER_TOTALPROPERTY`, `PROXY_WRITER_TYPE`, `PROXY_WRITER_WRITEALLFIELDS`, `PROXY_WRITER_ROOT`, `SORTERS_PROPERTY`, `SORTERS_DIRECTION`) VALUES
(1, 'Investors', 'ajax', '/investors/request/read', '/investors/request/create', '/investors/request/update', '/investors/request/destroy', 'INVESTOR_ID', 'json', 'data.items', 'data.totalCount', 'json', 1, 'data', 'INVESTOR_ID', 'ASC'),
(2, 'InvestorTypes', 'ajax', '/investortype/request/read', '/investortype/request/create', '/investortype/request/update', '/investortype/request/destroy', 'INVESTOR_TYPE_ID', 'json', 'data.items', 'data.totalCount', 'json', 1, 'data', 'INVESTOR_TYPE_ID', 'ASC'),
(3, 'Locations', 'ajax', '/locations/request/read', '/locations/request/create', '/locations/request/update', '/locations/request/destroy', 'LOCATION_ID', 'json', 'data.items', 'data.totalCount', 'json', 1, 'data', 'LOCATION_ID', 'ASC'),
(4, 'Shareholdings', 'ajax', '/shareholdings/request/read', '/shareholdings/request/create', '/shareholdings/request/update', '/shareholdings/request/destroy', 'SHAREHOLDING_ID', 'json', 'data.items', 'data.totalCount', 'json', 1, 'data', 'SHAREHOLDING_ID', 'ASC'),
(5, 'Shareprices', 'ajax', '/shareprices/request/read', '/shareprices/request/create', '/shareprices/request/update', '/shareprices/request/destroy', 'DATE', 'json', 'data.items', 'data.totalCount', 'json', 1, 'data', 'SHAREPRICES_ID', 'ASC'),
(6, 'SharepricesNames', 'ajax', '/sharepricesname/request/read', '/sharepricesname/request/create', '/sharepricesname/request/update', '/sharepricesname/request/destroy', 'SHAREPRICES_NAME_ID', 'json', 'data.items', 'data.totalCount', 'json', 1, 'data', 'SHAREPRICES_NAME_ID', 'ASC');

-- --------------------------------------------------------

--
-- Table structure for table `TREE_STORES`
--

CREATE TABLE IF NOT EXISTS `TREE_STORES` (
  `TREE_STORE_ID` int(19) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) NOT NULL,
  `TEXT` varchar(100) NOT NULL,
  `MODEL` varchar(100) NOT NULL,
  `STORE` varchar(100) NOT NULL,
  PRIMARY KEY (`TREE_STORE_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `TREE_STORES`
--

INSERT INTO `TREE_STORES` (`TREE_STORE_ID`, `NAME`, `TEXT`, `MODEL`, `STORE`) VALUES
(1, 'Investors', 'Investor List', 'Investor', 'Investors'),
(2, 'Investors', 'Investor Type', 'InvestorType', 'InvestorTypes'),
(3, 'Investors', 'Investor Location', 'Location', 'Locations'),
(4, 'Shareholdings', 'Shareholder List', 'Shareholding', 'Shareholdings'),
(5, 'Shareprices', 'Shareprices List', 'Shareprice', 'Shareprices'),
(6, 'Shareprices', 'Shareprices Name', 'SharepricesName', 'SharepricesNames');

-- --------------------------------------------------------

--
-- Table structure for table `TREE_STORE_CONTENT`
--

CREATE TABLE IF NOT EXISTS `TREE_STORE_CONTENT` (
  `TREE_STORE_ID` int(19) NOT NULL,
  `CONTENT_ID` int(19) NOT NULL,
  PRIMARY KEY (`TREE_STORE_ID`,`CONTENT_ID`),
  KEY `CONTENT_ID` (`CONTENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `TREE_STORE_CONTENT`
--

INSERT INTO `TREE_STORE_CONTENT` (`TREE_STORE_ID`, `CONTENT_ID`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE IF NOT EXISTS `USERS` (
  `USERNAME` varchar(40) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PASSWORD` varchar(40) NOT NULL,
  `ACTIVE` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`USERNAME`, `NAME`, `PASSWORD`, `ACTIVE`) VALUES
('admin', 'Administrator', '7b3311da916a2454a0c47a6aa2e0c69279a6b85e', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CONTENT_COLUMNS`
--
ALTER TABLE `CONTENT_COLUMNS`
  ADD CONSTRAINT `CONTENT_COLUMNS_ibfk_1` FOREIGN KEY (`CONTENT_ID`) REFERENCES `CONTENTS` (`CONTENT_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `CONTENT_TBARS`
--
ALTER TABLE `CONTENT_TBARS`
  ADD CONSTRAINT `CONTENT_TBARS_ibfk_1` FOREIGN KEY (`CONTENT_ID`) REFERENCES `CONTENTS` (`CONTENT_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `CONTENT_TBAR_LISTENERS`
--
ALTER TABLE `CONTENT_TBAR_LISTENERS`
  ADD CONSTRAINT `CONTENT_TBAR_LISTENERS_ibfk_1` FOREIGN KEY (`CONTENT_TBAR_ID`) REFERENCES `CONTENT_TBARS` (`CONTENT_TBAR_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `INVESTORS`
--
ALTER TABLE `INVESTORS`
  ADD CONSTRAINT `INVESTORS_ibfk_1` FOREIGN KEY (`INVESTOR_TYPE_ID`) REFERENCES `INVESTOR_TYPE` (`INVESTOR_TYPE_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `INVESTORS_ibfk_2` FOREIGN KEY (`LOCATION_ID`) REFERENCES `LOCATIONS` (`LOCATION_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `TREE_STORE_CONTENT`
--
ALTER TABLE `TREE_STORE_CONTENT`
  ADD CONSTRAINT `TREE_STORE_CONTENT_ibfk_1` FOREIGN KEY (`TREE_STORE_ID`) REFERENCES `TREE_STORES` (`TREE_STORE_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TREE_STORE_CONTENT_ibfk_2` FOREIGN KEY (`CONTENT_ID`) REFERENCES `CONTENTS` (`CONTENT_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
