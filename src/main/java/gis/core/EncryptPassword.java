package gis.core;

import java.security.MessageDigest;
import javax.xml.bind.DatatypeConverter;
public class EncryptPassword {
	public static String getHash(byte[] inputBytes, String algorithm) {
		String hashValue = "";
		
		try {
			MessageDigest messageDigest = MessageDigest.getInstance(algorithm);
			messageDigest.update(inputBytes);
			byte[] digestedBytes = messageDigest.digest();
			hashValue = DatatypeConverter.printHexBinary(digestedBytes).toLowerCase();
		}
		catch(Exception exc) {
			exc.printStackTrace();
		}
		
		return hashValue;
	}
	
	public static void main(String[] args) {
		String pass1 = "qwerty123";
		String pass2 = "qwerty123";
		
		System.out.println(getHash(pass1.getBytes(),"MD5"));
		
		if(getHash(pass1.getBytes(), "MD5").equals(getHash(pass2.getBytes(), "MD5"))) {
			System.out.println("password matched!");
		}else {
			System.out.println("password doesnt match!");
		}
	}
}
