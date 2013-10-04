// Settings object that controls default parameters for library methods:
accounting.settings = {
	currency: {
		symbol : "KZT",
		format: "%v %s",
		decimal : ".",
		thousand: ",",
		precision : 2
	},
	number: {
		precision : 0,
		thousand: ",",
		decimal : "."
	}
}

var min_salary = 18660;
var mrp = 1731;
$("#min_salary").html(min_salary);
$("#mrp").html(mrp);


function recalculate() {
	var full_salary = $("#full_salary").val();
	var number_of_working_days = $("#number_of_working_days").val();
	var number_of_worked_days = $("#number_of_worked_days").val();

	var payed = full_salary / number_of_working_days * number_of_worked_days;
	var pension = 0;
	if (payed*0.1>75*min_salary*0.1)
		pension = 75*min_salary*0.1; else
		pension = payed*0.1;
	var ipn = 0;
	if ((number_of_worked_days/number_of_working_days)>0.5) {
		if (((payed-pension-min_salary)*0.1)>0) {
			ipn = ((payed-pension-min_salary)*0.1);
		} else {
			ipn = 0;
		}
	} else {
		ipn = (payed-pension)*0.1;
	}
	var result = payed - pension - ipn;

	var soc_payment = 0;
	var temp = 0;
	if ((payed-pension)*0.05>10*min_salary*0.05)
		temp = 10*min_salary*0.05; else
		temp = (payed-pension)*0.05;

	if (temp<min_salary*0.05) {
		soc_payment = (min_salary-min_salary/10)*0.05;
	} else {
		if ((payed-pension)*0.05>10*min_salary*0.05) {
			soc_payment = 10*min_salary*0.05;
		} else {
			soc_payment = (payed-pension)*0.05;
		}
	}
	var soc_tax = 0;
	if (((payed-pension)*0.11-soc_payment)<min_salary*0.11) {
		soc_tax = min_salary*0.11;
	} else {
		soc_tax = (payed-pension)*0.11-soc_payment;
	}


	$("#result").html(accounting.formatMoney(result));
	$("#payed").html(accounting.formatMoney(payed));
	$("#pension").html(accounting.formatMoney(pension));
	$("#ipn").html(accounting.formatMoney(ipn));
	$("#soc_payment").html(accounting.formatMoney(soc_payment));
	$("#soc_tax").html(accounting.formatMoney(soc_tax));
}

$("#full_salary").keyup(recalculate);
$("#number_of_working_days").keyup(recalculate);
$("#number_of_worked_days").keyup(recalculate);
$("#min_salary").keyup(recalculate);
$("#mrp").keyup(recalculate);
