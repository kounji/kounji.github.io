<template>
  <div>
		<h2>filter</h2>
		<p>number: {{number}}</p>
		<p>date: {{date}}</p>
		<p>time: {{time}}</p>
		<hr>
		<p>numberFilter : {{number | numberFilter}}</p>
		<p>numberFilter('0,00') : {{number | numberFilter('0,0.00')}}</p>
		<p>numberFilter('0,00', {precision: 2}) : {{number | numberFilter('0,0.00', {precision: 2})}}</p>
		<hr>
		<p>numberFilterAuto : {{number | numberFilterAuto}}</p>
		<p>numberFilterAuto('0,00') : {{number | numberFilter('0,0.00')}}</p>
		<p>numberFilterAuto('0,00') : {{-314497136.1365 | numberFilter('0,0.0000',{precision: 4})}}</p>
		<p>numberFilterAuto('0,00', {precision: 2}) : {{number | numberFilterAuto('0,0.00', {precision: 2})}}</p>
		<p>numberFilterAuto('0,00', {precision: 2}, false) : {{number2 | numberFilterAuto('0,0', {precision: 2},false)}}</p>
		<hr>
		<p>dateFilter : {{date | dateFilter}}</p>
		<p>dateFilter('YYYY/MM/DD') : {{date | dateFilter('YYYY/MM/DD')}}</p>
		<p>dateFilter time: {{time | dateFilter}}</p>
		<p>dateFilter hhmmss : {{hhmmss | dateFilter('hhmmss', 'HHmmss')}}</p>
		<p>dateFilter 요일: {{date | dateFilter('YYYY/MM/DD (ddd) dddd')}}</p>
		<hr>
		<p>dataFilter 전화번호 마스킹: {{phone1 | maskingFilter('phone')}}</p>
		<p>dataFilter 전화번호 마스킹2: {{phone2 | maskingFilter('phone')}}</p>
		<p>dataFilter 계좌 마스킹: {{account | maskingFilter('account')}}</p>
		<p>dataFilter 카드 마스킹: {{cardNum | maskingFilter('card')}}</p>
		<p>dataFilter 성명 마스킹: {{'허준' | maskingFilter('name')}}</p>
		<p>dataFilter 성명 마스킹: {{'홍길동' | maskingFilter('name')}}</p>
		<p>dataFilter 성명 마스킹: {{'박혁거세' | maskingFilter('name')}}</p>
		<p>dataFilter 성명 마스킹: {{'Herry' | maskingFilter('name')}}</p>
		<hr>
		<p>dataFilter 문자열자르기 정상: {{cardNum | stringCutFilter(5)}}</p>
		<p>dataFilter 문자열자르기 정상 뒤에 ... 붙이기: {{cardNum | stringCutFilter(5, 'N', 'Y')}}</p>
		<p>dataFilter 문자열자르기 정상 뒤에 *** 붙이기: {{cardNum | stringCutFilter(5 ,'N', 'Y', '***')}}</p>
		<p>dataFilter 문자열자르기 리버스자르기: {{cardNum | stringCutFilter(4,'Y')}}</p>
		<hr>
		<hr>
		<div>
			금액 카운트
			<span id="asetAm" class="num counter" :data-count="asetAm"></span>
		</div>
  </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import {numberFormat} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import {maskingformat} from '@/utils/data'
import {amountCountAnimate} from '@/utils/jUtils'

  export default {
    name: 'SampleFilter',
		data: function() {
			return {
				number: 1234.456,
				number2: 1234,
				date: null, //'20200302',
				time: '20200302111233',
				hhmmss: '101122',
				phone1 : '010-123-4567',
				phone2 : '010-1234-5678',
				account : '330456789456789',
				cardNum : '4000-1234-5678-0000',
			}
		},
		mounted() {
			console.log(dateFormat(new Date(), 'YYYYMMDDhhmmssSSS'))
			console.log(numberFormat(12345678.456, '0,0.00'))
			console.log(numberFormat(12345678.456, '0,0.00', {precision: 2}))
			console.log(numberFormat(12345678, '0,0.00', {precision: 2}))
			console.log( (12345678).toString().indexOf('.'))
			console.log( (12345678.0111).toString().indexOf('.'))

			const a = numberFormat(12345678.456, '0,0.00')
			console.log(a)


			console.log("전화번호 마스킹 1", maskingformat(this.phone1, 'phone'))
			console.log("전화번호 마스킹 2", maskingformat(this.phone2, 'phone'))

			console.log("계좌 마스킹 ", maskingformat(this.account, 'account'))



			this.sample('')
			// console.log(this.list)
			// this.parseCardList(this.list)

			amountCountAnimate("asetAm", -314497136.1365);
		},
    methods: {
			sample(v='xxx') {
				console.log(v) 
			}
		},
			mixins: [
					commonMixin
			],
  }
</script>
